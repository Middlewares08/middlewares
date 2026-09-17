'use strict';
const crypto = require('crypto');

function hashLicenseKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('licenses', 'licenseKeyHash', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('licenses', 'licenseKeyPreview', {
      type: Sequelize.STRING(5),
      allowNull: true,
    });

    const [rows] = await queryInterface.sequelize.query('SELECT id, "licenseKey" FROM licenses;');
    for (const row of rows) {
      await queryInterface.sequelize.query(
        'UPDATE licenses SET "licenseKeyHash" = :hash, "licenseKeyPreview" = :preview WHERE id = :id',
        {
          replacements: {
            hash: hashLicenseKey(row.licenseKey),
            preview: row.licenseKey.split('-').pop(),
            id: row.id,
          },
        }
      );
    }

    await queryInterface.changeColumn('licenses', 'licenseKeyHash', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('licenses', 'licenseKeyPreview', {
      type: Sequelize.STRING(5),
      allowNull: false,
    });
    await queryInterface.addConstraint('licenses', {
      fields: ['licenseKeyHash'],
      type: 'unique',
      name: 'licenses_license_key_hash_unique',
    });

    await queryInterface.removeColumn('licenses', 'licenseKey');
  },

  down: async (queryInterface, Sequelize) => {
    // Original plaintext keys are not recoverable from the hash; this restores
    // the column structure only, not the data.
    await queryInterface.addColumn('licenses', 'licenseKey', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn('licenses', 'licenseKeyHash');
    await queryInterface.removeColumn('licenses', 'licenseKeyPreview');
  },
};

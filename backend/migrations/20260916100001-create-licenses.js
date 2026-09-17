'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('licenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      licenseKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      licenseType: {
        type: Sequelize.ENUM('Trial', 'Standard', 'Pro', 'Enterprise'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'revoked'),
        allowNull: false,
        defaultValue: 'active',
      },
      issuedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      recipientEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipientName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      emailSentAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      emailSendError: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('licenses', ['projectId']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('licenses');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_licenses_licenseType";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_licenses_status";');
  },
};

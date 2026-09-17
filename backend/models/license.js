'use strict';
const { Model } = require('sequelize');
const { LICENSE_TYPES, LICENSE_STATUSES } = require('../constants/license');

module.exports = (sequelize, DataTypes) => {
  class License extends Model {
    static associate(models) {
      License.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    }
  }

  License.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      licenseKeyHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      licenseKeyPreview: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      licenseType: {
        type: DataTypes.ENUM(...LICENSE_TYPES),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...LICENSE_STATUSES),
        allowNull: false,
        defaultValue: 'active',
      },
      issuedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      recipientName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      emailSentAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      emailSendError: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'License',
      tableName: 'licenses',
    }
  );

  return License;
};

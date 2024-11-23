import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import { auditLogAction } from '../shareVariable.js';

const AuditLog = sequelize.define('auditLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    documentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM(
            auditLogAction.Read,
            auditLogAction.Modified,
            auditLogAction.Created,
            auditLogAction.Deleted,
            auditLogAction.Approved,
            auditLogAction.Rejected
        ),
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
},
    {
        timestamps: false,
    }
);

AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.User, { foreignKey: 'userId' });
    AuditLog.belongsTo(models.Document, { foreignKey: 'documentId' });
}

export default AuditLog;
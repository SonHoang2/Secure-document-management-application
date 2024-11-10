import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

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
        type: DataTypes.ENUM('read', 'modified', 'approved', 'rejected'),
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
},
    {
        timestamps: false,
    }
);
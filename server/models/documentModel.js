import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import { documentStatus } from '../shareVariable.js';

const Document = sequelize.define('document', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    public: {
        type: DataTypes.BOOLEAN,
    },
    status: {
        type: DataTypes.ENUM(
            documentStatus.Approved, 
            documentStatus.Pending, 
            documentStatus.Rejected, 
            documentStatus.Deleted
        ),
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        timestamps: false,
    }
);

Document.associate = (models) => {
    Document.belongsTo(models.User, { foreignKey: 'createdBy'});
    Document.hasMany(models.Permission, { foreignKey: 'documentId' });
    Document.hasMany(models.AuditLog, { foreignKey: 'documentId' });
};

export default Document;
import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { roleName } from '../shareVariable.js';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "The email is invalid"
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isComplex(value) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$/;
                if (!regex.test(value)) {
                    throw new Error(
                        "Password must be 12-20 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                    );
                }
            }
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    googleAccount: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role: {
        type: DataTypes.ENUM(roleName.User, roleName.Admin, roleName.Manager),
        defaultValue: 'user'
    },
},
    {
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        },
    }
);

User.associate = (models) => {
    User.hasMany(models.Document, { foreignKey: 'createdBy' });
    User.hasMany(models.Permission, { foreignKey: 'userId' });
    User.hasMany(models.AuditLog, { foreignKey: 'userId' });
}

User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 12);
});

User.prototype.validPassword = function (password) {
    console.log("password:", password, this.password);

    return bcrypt.compareSync(password, this.password);
};



export default User;
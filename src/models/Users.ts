import { DataType, DataTypes, Model } from 'sequelize';
import sequelize from '../config/databases';

class Users extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public name!: string;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true
    }
);

export default Users;
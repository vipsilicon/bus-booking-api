import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/databases';
import Users from './Users';

class UserSessions extends Model {
    public id!: number;
    public user_id!: number;
    public token!: string;
}

UserSessions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        tableName: 'user_sessions',
        timestamps: true
    }
);

export default UserSessions;
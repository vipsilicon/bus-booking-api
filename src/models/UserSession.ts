import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/databases';
import Users from './Users';


export enum UserSessionStatus {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REFRESH_TOKEN = 'REFRESH TOKEN',
    TOKEN_EXPIRED = 'TOKEN EXPIRED',
    ACTIVE = 'ACTIVE'
}

class UserSessions extends Model {
    public id!: number;
    public user_id!: number;
    public token!: string;
    // await UserSessions.destroy({ where: { accessToken } });
    public status!: UserSessionStatus
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
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.ENUM(...Object.values(UserSessionStatus)),
            allowNull: false,
            defaultValue: UserSessionStatus.LOGIN
        }
    },
    {
        sequelize,
        tableName: 'user_sessions',
        timestamps: true
    }
);

export default UserSessions;
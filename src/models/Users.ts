import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@database/DBConnection';
import { ROLES_TYPE, ROLES } from '@constants/index';
import { IUser } from '@/interfaces/users.interfaces';

type userCreation = Optional<IUser, 'id' | 'lastName' | 'address_2' | 'role'>;

class Users extends Model<IUser, userCreation> implements IUser {
	public id!: number;
	public email!: string;
	public password!: string;
	public firstName!: string;
	public lastName!: string;
	public mobile!: number;
	public address_1!: string;
	public address_2!: string;
	public city!: string;
	public state!: string;
	public pin_code!: number;
	public role!: ROLES_TYPE;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(15),
			allowNull: false,
			unique: true,
			validate: {
				len: [10, 15]
			}
		},
		address_1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address_2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false
		},
		pin_code: {
			type: DataTypes.STRING(8),
			allowNull: false,
			validate: {
				len: [6, 8]
			}
		},
		role: {
			type: DataTypes.ENUM(...Object.values(ROLES)),
			allowNull: true,
			defaultValue: ROLES.USER
		}
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: true,
		defaultScope: {
			attributes: { exclude: ['password'] }
		}
	}
);

export default Users;

import { ROLES_TYPE } from '@constants/index';

interface IUser {
	id?: number;
	email: string;
	password: string;
	firstName: string;
	lastName?: string | null;
	mobile: number;
	address_1: string | null;
	address_2?: string | null;
	city: string;
	state: string;
	pin_code: number;
	role?: ROLES_TYPE | null;
}

interface IUserLogin {
	email?: string;
	mobile?: number;
	password: string;
}

export { IUser, IUserLogin };

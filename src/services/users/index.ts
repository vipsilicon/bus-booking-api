import { Op } from 'sequelize';
import Users from '@/models/Users';
import { IUser, IUserLogin } from '@/interfaces/users.interfaces';
import { UserPassword } from '@/utils/bcrypt/userPassword';
import * as Constants from '@constants/index';
import Jwt from '@/utils/jwt';

const JWT = new Jwt();

const signUp = async (usersData: IUser) => {
	const user = await Users.create({
		firstName: usersData.firstName,
		lastName: usersData.lastName,
		email: usersData.email,
		password: usersData.password,
		mobile: usersData.mobile,
		address_1: usersData.address_1,
		address_2: usersData.address_2,
		city: usersData.city,
		state: usersData.state,
		pin_code: usersData.pin_code
	});

	const userData = await Users.findByPk(user.id, {
		attributes: { exclude: ['password'] },
		raw: true
	});

	console.log('userData');
	console.log(userData);
	return userData;
};

const login = async (loginData: IUserLogin) => {
	const { email, mobile, password } = loginData;

	const user = await Users.findOne({
		where: {
			[Op.or]: [...(email ? [{ email }] : []), ...(mobile ? [{ mobile }] : [])]
		},
		attributes: { exclude: ['createdAt', 'updatedAt'], include: ['password'] },
		raw: true
	});

	if (!user) {
		throw new Error(Constants.USERS.message.USER_NOT_FOUND);
	}

	const isPasswordValid = await UserPassword.comparePassword(
		password,
		user.password
	);

	if (!isPasswordValid) {
		throw new Error(Constants.USERS.message.INVALID_CREDENTIALS);
	}

	const response = {
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		mobile: user.mobile,
		address_1: user.address_1,
		address_2: user.address_2,
		city: user.city,
		state: user.state,
		pin_code: user.pin_code,
		role: user.role,
		authToken: JWT.sign(
			{ id: user.id, email: user.email, role: user.role },
			{ expiresIn: '1h' }
		)
	};
	return response;
};

export { signUp, login };

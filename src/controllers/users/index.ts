import { Request, Response } from 'express';
import { UserPassword } from '@/utils/bcrypt/userPassword';
import { IUser, IUserLogin } from '@/interfaces/users.interfaces';

import * as Constants from '@constants/index';
import * as Services from '@services/users/index';

const signUp = async (request: Request, response: Response) => {
	const appResponse = { ...Constants.defaultServerResponse };

	try {
		const userData: IUser = request.body;

		const user = await Services.signUp({
			...userData,
			password: await UserPassword.hashPassword(userData.password)
		});

		appResponse.status = Constants.HTTP.SUCCESS.code;
		appResponse.message = Constants.USERS.message.USER_CREATED;
		appResponse.body = { ...user };
	} catch (error) {
		console.log(error.message);
		appResponse.status = Constants.HTTP.INTERNAL_SERVER_ERROR.code;
		appResponse.message =
			error instanceof Error
				? error.message
				: Constants.HTTP.INTERNAL_SERVER_ERROR.message;
	}

	response.status(appResponse.status).json(appResponse);
};

const login = async (request: Request, response: Response) => {
	const appResponse = { ...Constants.defaultServerResponse };

	try {
		const data: IUserLogin = request.body;

		const loginData = await Services.login(data);

		appResponse.status = Constants.HTTP.SUCCESS.code;
		appResponse.message = Constants.USERS.message.LOGIN_SUCCESS;
		appResponse.body = loginData;
	} catch (error) {
		console.log(error.message);
		appResponse.status = Constants.HTTP.INTERNAL_SERVER_ERROR.code;
		appResponse.message =
			error instanceof Error
				? error.message
				: Constants.HTTP.INTERNAL_SERVER_ERROR.message;
	}

	response.status(appResponse.status).json(appResponse);
};

export { signUp, login };

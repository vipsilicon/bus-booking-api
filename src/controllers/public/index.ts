import * as Constants from '@constants/index';
import * as Services from '@services/public/index';

import { Request, Response } from 'express';

const test = async (request: Request, response: Response) => {
	const appResponse = { ...Constants.defaultServerResponse };

	try {
		const query = request.query;
		console.log('Public test query:', JSON.stringify(query));

		const users = await Services.getUsers();

		appResponse.status = Constants.HTTP.SUCCESS.code;
		appResponse.message = 'Users retrieved successfully';
		appResponse.body = users;
	} catch (error) {
		appResponse.status = Constants.HTTP.INTERNAL_SERVER_ERROR.code;
		appResponse.message =
			error instanceof Error
				? error.message
				: Constants.HTTP.INTERNAL_SERVER_ERROR.message;
	}

	response.status(appResponse.status).json(appResponse);
};

export { test };

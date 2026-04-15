import * as Constants from '@constants/index';
import * as Services from '@services/public/index';

import { Request, Response } from 'express';

const test = async (request: Request, response: Response) => {
	const appResponse = { ...Constants.defaultServerResponse };

	try {
		const query = request.query;
		console.log(JSON.stringify(query));

		const user = await Services.getUsers();

		appResponse.status = 200;
		appResponse.message = 'test message';

		if (user) {
			appResponse.body = user;
		}
	} catch (error) {
		appResponse.status = 400;
		appResponse.message = error.message;
	}

	response.status(appResponse.status).json(appResponse);
};

export { test };

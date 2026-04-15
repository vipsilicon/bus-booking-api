import { Request, Response } from 'express';

import * as Constants from '@constants/index';

const getConfig = async (request: Request, response: Response) => {
	const appResponse = { ...Constants.defaultServerResponse };
	console.log(request.body);

	response.status(appResponse.status).json(appResponse);
};

export { getConfig };

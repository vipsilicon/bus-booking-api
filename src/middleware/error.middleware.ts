import { NextFunction, Request, Response } from 'express';
import { defaultServerResponse, HTTP } from '@constants/index';

const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	console.error('Unhandled error:', err);

	const response = {
		...defaultServerResponse,
		status: HTTP.INTERNAL_SERVER_ERROR.code,
		message:
			err instanceof Error ? err.message : HTTP.INTERNAL_SERVER_ERROR.message
	};

	res.status(response.status).json(response);
};

export default errorHandler;

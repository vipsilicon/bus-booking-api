import { Request, Response, NextFunction } from 'express';
import Jwt from '@/utils/jwt';
import * as Constants from '@constants/index';

const JWT = new Jwt();

const validateToken = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	console.log(req.headers['authorization']);

	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		throw new Error(Constants.ERROR_HANDLING.message.AUTH_TOKEN_MISSING);
	}

	const token = authHeader.split('Bearer ')[1]; // Assuming the token is in the

	if (!token) {
		throw new Error(Constants.ERROR_HANDLING.message.AUTH_TOKEN_MISSING);
	}

	try {
		const decoded = JWT.verify(token);
		console.log(decoded); // Attach decoded token data to the request object
		next();
	} catch (error) {
		throw new Error(Constants.ERROR_HANDLING.message.INVALID_TOKEN);
	}
};

export default validateToken;

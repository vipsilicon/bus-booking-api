import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';

dotenv.config();

class Jwt {
	secret: string;

	constructor() {
		if (process.env.JWT_SECRET) {
			this.secret = process.env.JWT_SECRET as string;
		}
	}

	sign(payload: object, options?: SignOptions) {
		if (!this.secret) {
			throw new Error('JWT_SECRET not defined');
		}

		return jwt.sign(payload, this.secret, {
			...options
		});
	}

	verify(token: string) {
		try {
			return jwt.verify(token, this.secret);
		} catch (error) {
			throw new Error('Invalid Token');
		}
	}

	decodeToken(token: string) {
		return jwt.decode(token, { complete: true });
	}
}

export default Jwt;

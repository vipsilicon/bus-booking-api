import CustomError from '@/common/custom.error';
import * as Constants from '@constants/index';

export class RecordNotFound extends CustomError {
	statusCode = 404;

	constructor(public message: string = Constants.HTTP.NOT_FOUND.message) {
		super(message);
		Object.setPrototypeOf(this, RecordNotFound.prototype);
	}

	serializedErrors() {
		return [{ message: this.message }];
	}
}

export default RecordNotFound;

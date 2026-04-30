import * as Joi from 'joi';

class Schema {
	signUp = Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().optional(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		mobile: Joi.string()
			.pattern(/^[0-9]{10}$/)
			.required(),
		address_1: Joi.string().optional(),
		address_2: Joi.string().optional(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		pin_code: Joi.string()
			.pattern(/^[0-9]{6}$/)
			.required()
	});

	login = Joi.object()
		.keys({
			email: Joi.string().email(),
			mobile: Joi.string().pattern(/^[0-9]{10}$/),
			password: Joi.string().min(6).required()
		})
		.or('email', 'mobile');
}

export default new Schema();

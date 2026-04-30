import express, { Router } from 'express';

import InputValidator from '@/middleware/input.validator';
import inputSchema from './inputschema';

import * as Controller from '@controllers/users';

const router: Router = express.Router();
const jsonParser = express.json();
const path = 'users';

router.post(
	'/signup',
	jsonParser,
	InputValidator.validateBody(inputSchema.signUp),
	Controller.signUp
);

router.post(
	'/login',
	jsonParser,
	InputValidator.validateBody(inputSchema.login),
	Controller.login
);

export { router, path };

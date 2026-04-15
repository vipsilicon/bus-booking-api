import express, { Router } from 'express';

import * as ConfigController from '@controllers/config/index';

const router: Router = express.Router();
const jsonParser = express.json();
const path = 'config';

router.get('/', jsonParser, ConfigController.getConfig);

export { router, path };

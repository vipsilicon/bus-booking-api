import express, { Router } from 'express';

import * as ConfigController from '@controllers/config/index';

const router: Router = express.Router();
const path = 'config';

router.get('/', ConfigController.getConfig);

export { router, path };

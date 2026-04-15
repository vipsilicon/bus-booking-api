import express, { Router } from 'express';

import * as Controller from '@controllers/public';

const router: Router = express.Router();
const path = 'public';

router.get('/', Controller.test);

export { router, path };

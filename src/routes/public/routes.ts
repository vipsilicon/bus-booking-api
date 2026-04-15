import express, { Router } from 'express';

import * as Controller from '@controllers/public';

const router: Router = express.Router();
const path = 'public';
const jsonParser = express.json();

router.get('/', jsonParser, Controller.test);

export { router, path };

import express from 'express';

import * as ConfigRoutes from '@routes/config/routes';
import * as PublicRoutes from '@routes/public/routes';

const router: express.Router = express.Router();

router.use(`/${ConfigRoutes.path}`, ConfigRoutes.router);
router.use(`/${PublicRoutes.path}`, PublicRoutes.router);

export default router;

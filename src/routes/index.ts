import express from 'express';

import * as ConfigRoutes from '@routes/config/routes';
import * as PublicRoutes from '@routes/public/routes';
import * as UsersRoutes from '@routes/users/routes';

const router: express.Router = express.Router();

router.use(`/${ConfigRoutes.path}`, ConfigRoutes.router);
router.use(`/${PublicRoutes.path}`, PublicRoutes.router);
router.use(`/${UsersRoutes.path}`, UsersRoutes.router);

export default router;

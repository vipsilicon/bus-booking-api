import express from 'express';
// import cors from 'cors';

import Router from '@/routes/index';
// import * as Constants from '@constants/index';

const app: express.Express = express();

// if (process.env.NODE_ENV === Constants.NODE_ENVIRONMENT.DEVELOPMENT) {
// 	const allowOrigins = ['http://localhost:3000'];

// 	app.options('*', cors());
// 	const corsOption: cors.CorsOptions = {
// 		origin: allowOrigins
// 	};
// 	app.use(cors(corsOption));
// } else if (process.env.NODE_ENV === Constants.NODE_ENVIRONMENT.PRODUCTION) {
// 	app.use(cors());
// }

app.use(Router);

app.use(express.static('public'));

export default app;

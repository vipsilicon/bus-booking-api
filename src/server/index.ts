import cors from 'cors';
import express from 'express';

import Router from '@routes/index';
import errorHandler from '@middleware/error.middleware';

const app: express.Express = express();

app.use(express.json());

const allowOrigins = ['http://localhost:3000'];
const corsOptions = {
	origin: process.env.NODE_ENV === 'production' ? true : allowOrigins
};

app.use(cors(corsOptions));
app.use(Router);
app.use(express.static('public'));
app.use(errorHandler);

export default app;

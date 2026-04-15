import { Sequelize } from 'sequelize';
import '@common/env';

export const sequelize = new Sequelize(
	process.env.DB_NAME as string,
	process.env.DB_USERNAME as string,
	process.env.DB_PASSWORD as string,
	{
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		dialect: 'mysql',
		logging: false
	}
);

export const connectDB = async () => {
	try {
		await sequelize.authenticate();
		if (process.env.NODE_ENV !== 'production') {
			await sequelize.sync();
		}
		console.log('Database connected');
	} catch (error) {
		console.error('Database connection failed:', error instanceof Error ? error.message : error);
		throw error;
	}
};

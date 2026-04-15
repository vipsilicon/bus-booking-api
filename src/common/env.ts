import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
	'PORT',
	'DB_NAME',
	'DB_USERNAME',
	'DB_PASSWORD',
	'DB_HOST',
	'DB_PORT'
];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
	console.error(`Missing required environment variables: ${missing.join(', ')}`);
	process.exit(1);
}

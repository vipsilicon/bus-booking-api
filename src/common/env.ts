import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
	console.log('Port not found!!!');
	process.exit(1);
}

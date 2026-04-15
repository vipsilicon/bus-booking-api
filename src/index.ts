import '@common/env';
import Server from '@server/index';
import { connectDB } from '@database/DBConnection';

const PORT = Number(process.env.PORT ?? 3000);

const startServer = async () => {
	try {
		await connectDB();
		Server.listen(PORT, () => {
			console.log(`Server running on ${PORT}`);
		});
	} catch (error) {
		console.error('Server startup failed:', error instanceof Error ? error.message : error);
		process.exit(1);
	}
};

startServer();

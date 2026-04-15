import '@common/env';
import Server from '@server/index';
import { connectDB } from '@database/DBConnection';

(async () => {
	await connectDB();
})();

const PORT: number = parseInt(process.env.PORT as string, 10);

Server.listen(PORT, async () => {
	console.log(`Server running on ${PORT}`);
});

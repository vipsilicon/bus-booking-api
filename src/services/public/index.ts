import Users from '@/models/Users';

const getUsers = async () => {
	try {
		const users = await Users.findOne();
		return users;
	} catch (error) {
		throw error;
	}
};

export { getUsers };

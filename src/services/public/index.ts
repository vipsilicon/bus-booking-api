import Users from '@models/Users';

const getUsers = async () => Users.findAll();

export { getUsers };

import { Sequelize }from 'sequelize';
import { config } from './config';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    logging: false
});

export default sequelize;
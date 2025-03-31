import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`)});

export const config = {
    port: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'test',
    host: process.env.host || 'localhost',
    username: process.env.username || 'root',
    password: process.env.password || 'root',
    database: process.env.database || 'travel_booking',
    jwt_SECRET: process.env.JWT_SECRET || 'your_secret_key'
};
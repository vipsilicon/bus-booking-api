import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`)});

export const config = {
    port: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'test',
    host: process.env.HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'travel_booking',
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    origin: process.env.ORIGIN || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
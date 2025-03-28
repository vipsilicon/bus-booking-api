import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`)});

export const config = {
    port: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'test'
};
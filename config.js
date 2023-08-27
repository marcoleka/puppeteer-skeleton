import MySQLConnection from '#src/db/MySQLConn';
import logger from '#src/logger/logger';
import { config } from 'dotenv';

config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const conn = new MySQLConnection(dbConfig);

export { conn, logger }
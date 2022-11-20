require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PASSWORD = process.env.DB_PASSWORD;
//const DB_PORT = process.env.DB_PORT;

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
});

module.exports = pool.promise();

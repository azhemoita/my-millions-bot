'use strict';

const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  connectionLimit: 15,
});

async function query(sql, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, params);
    return result;
  } catch (error) {
    console.error('MariaDB Error: ', error);
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

module.exports = {
  query,
};

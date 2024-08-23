import mysql from 'mysql2/promise';
import config from './config';

const pool = mysql.createPool(config.db);

export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

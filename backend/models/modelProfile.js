import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const createProfileTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      dob DATE NOT NULL,
      workplace VARCHAR(255),
      beverage VARCHAR(255),
      favorite VARCHAR(255),
      about VARCHAR(255),
      latitude NUMERIC,
      longitude NUMERIC
    );
  `;
  const client = await pool.connect();
  try {
    await client.query(createTableQuery);
    console.log('Profiles table created successfully');
  } catch (err) {
    console.error('Error creating profiles table', err);
  } finally {
    client.release();
  }
};

createProfileTable();

export { pool };

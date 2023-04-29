import { pool } from '../models/modelProfile.js';

export const getUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM profiles;';
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const query = 'SELECT * FROM profiles WHERE id=$1;';
    const { rows } = await pool.query(query, [req.params.id]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(404).json({ 
      error: error.message
    });
  }
};;

export const createUser = async (req, res) => {
  const { name, dob, beverage, workplace, favorite, about } = req.body;
  try {
    const query = 'INSERT INTO profiles (name, dob, beverage, workplace, favorite, about) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const { rows } = await pool.query(query, [name, dob, beverage, workplace, favorite, about]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(404).json({ 
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  const { name, dob, beverage, workplace, favorite, about } = req.body;
  try {
    const query = 'UPDATE profiles SET name=$1, dob=$2, beverage=$3, workplace=$4, favorite=$5, about=$6 WHERE id=$7 RETURNING *';
    const values = [name, dob, beverage, workplace, favorite, about, req.params.id];
    const { rows } = await pool.query(query, values);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
};

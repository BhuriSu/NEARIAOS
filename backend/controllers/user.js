import { pool } from '../models/modelProfile.js';

export const getUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM profile;';
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
    const query = 'SELECT * FROM profile WHERE id=$1;';
    const { rows } = await pool.query(query, [req.params.id]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(404).json({ 
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const query = 'UPDATE profile SET name=$1, dob=$2, workplace=$3, beverage=$4, favorite=$5, about=$6 WHERE id=$7 RETURNING *;';
    const values = [req.body.name, Date.now(), req.body.workplace, req.body.beverage, req.body.favorite, req.body.about, req.params.id];
    const { rows } = await pool.query(query, values);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
};

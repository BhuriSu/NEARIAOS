
import { errorHandler } from '../utils/error.js';
import pool from '../config/database.js'; 

export const getUser = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM profile WHERE id = $1', [req.params.userId]);
    client.release();

    if (result.rows.length === 0) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE profile
       SET username = $1, date = $2, beverage = $3, workplace = $4, favorite = $5, about = $6, profile_picture = $7
       WHERE id = $8
       RETURNING *`,
      [
        req.body.username,
        req.body.date,
        req.body.beverage,
        req.body.workplace,
        req.body.favorite,
        req.body.about,
        req.body.profilePicture,
        req.params.userId
      ]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM profile WHERE id = $1', [req.params.userId]);
    client.release();
    
    res.status(200).json('User has been deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting profile' });
  }
};
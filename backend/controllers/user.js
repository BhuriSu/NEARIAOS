import pool from '../config/database.js';

export const createUser = async (req, res) => {
  try {
    const { username, date, beverage, workplace, favorite, about, profilePicture } = req.body;
    const query = `
      INSERT INTO users (username, date, beverage, workplace, favorite, about, profile_picture)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [username, date, beverage, workplace, favorite, about, profilePicture];
    const result = await pool.query(query, values);
    
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// READ operation
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// UPDATE operation
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, date, beverage, workplace, favorite, about, profilePicture } = req.body;
    const query = `
      UPDATE users 
      SET username = $1, date = $2, beverage = $3, workplace = $4, favorite = $5, about = $6, profile_picture = $7
      WHERE id = $8
      RETURNING *
    `;
    const values = [username, date, beverage, workplace, favorite, about, profilePicture, id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

// DELETE operation
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User has been deleted', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};
import pool from '../config/database.js';

export const Lists = async (req, res) => {
  res.json('respond with a resource');
};

export const FindUsers = async (req, res) => {
  const { latitude, longitude, radius } = req.body;
  const userId = req.params.userId;
  if ([userId, latitude, longitude, radius].some(el => el === undefined)) {
    return res.status(400).json({
      success: false,
      err: 'Arguments are undefined'
    });
  }

  try {
    const client = await pool.connect();
    const query = `
      SELECT * FROM profile 
      WHERE ST_Distance(
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        ST_SetSRID(ST_MakePoint(profile.longitude, profile.latitude), 4326)
      ) < $3
    `;
    const params = [longitude, latitude, radius];

    const result = await client.query(query, params);
    const list = result.rows;

    await client.query(
      `
      UPDATE profile 
      SET latitude = $1, longitude = $2 
      WHERE username = $3
      `,
      [latitude, longitude, userId]
    );

    client.release();

    if (list.length > 0) {
      return res.json({
        success: true,
        list
      });
    }

    return res.status(404).json({
      success: false,
      err: 'No user found in this geolocation'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: error.message
    });
  }
};

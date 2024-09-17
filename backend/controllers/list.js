export const Lists = async (req, res) => {
  res.json('respond with a resource');
};

export const FindUsers = async (req, res) => {
  const { id, latitude, longitude, radius } = req.body;
  if ([id, latitude, longitude, radius].some(el => el === undefined)) {
    return res.status(400).json({
      success: false,
      err: 'Arguments are undefined'
    });
  }

  try {
    await client.connect();
    const db = client.db('yourDatabaseName'); // Replace with your database name
    const profiles = db.collection('profiles'); // Replace with your collection name

    // Convert radius from meters to radians for MongoDB geospatial queries
    const radiusInRadians = radius / 6378100;

    // Perform the geospatial query using $geoWithin or $near
    const list = await profiles.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radius // distance in meters
        }
      }
    }).toArray();

    // Update the user's latitude and longitude
    const updateResult = await profiles.updateOne(
      { username: id },
      { $set: { latitude, longitude } }
    );

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
  } finally {
    await client.close();
  }
};
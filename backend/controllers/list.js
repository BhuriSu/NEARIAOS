import  Profile  from '../models/Profile.js';

const rad = x => (x * Math.PI) / 180;
const distHaversine = (p1, p2) => {
  const R = 6371; 
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
    Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) *
    Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d.toFixed(3) * 1000; 
};

export const Lists = async (req, res) => {
  res.json('respond with a resource');
};

export const FindUsers = async (req, res) => {
  const { userId, latitude, longitude, radius } = req.body;
  if ([userId, latitude, longitude, radius].some(el => el === undefined)) {
    return res.status(400).json({
      success: false,
      err: 'Arguments are undefined'
    });
  }

  try {
    const allProfiles = await Profile.find({});

    const list = [];
    allProfiles.forEach(el => {
      const dist = distHaversine(
        {
          lat: latitude,
          lng: longitude
        },
        {
          lat: el.latitude,
          lng: el.longitude
        }
      );

      if (dist < radius) list.push(el);
    });
    await Profile.findByIdAndUpdate(
      {
       username: userId
      },
      {
        $set: {
          latitude,
          longitude
        }
      }
    );
    if (list) {
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
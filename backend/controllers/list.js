import Profile from '../models/modelProfile.js'; 

// geolocation formula
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
  const { id, latitude, longitude, radius } = req.body;
  if ([id, latitude, longitude, radius].some(el => el === undefined)) {
    return res.send({
      success: false,
      err: 'Arguments is undefined'
    });
  }
 
  const listAll = await Profile.find({});
  const list = [];
  listAll.forEach(el => {
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
 
  await Profile.updateOne(
    {
      _id:req.params.id
    },
    {
      // $set operator replaces the value of a field with the specified value.
      $set: {
        latitude,
        longitude
      }
    }
  );
  if (list) {
    return res.send({
      success: true,
      list
    });
  }
  return res.send({
    success: false,
    err: 'No such a user from this geolocation'
  });
};

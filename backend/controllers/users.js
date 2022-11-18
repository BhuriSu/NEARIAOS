
import Profile from '../models/modelProfile.js';
import asyncHandler from 'express-async-handler';

export const Users = asyncHandler(async(req, res) => {
  res.json('respond with a resource');
});

export const DetailUsers = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      doB,
      workplace,
      favorite,
      beverage,
      avatar
    } = req.body;
    await Profile.findOneAndUpdate({_id: req.user._id}, {
      avatar, name, doB, workplace, favorite, beverage
  })
  res.json({msg: "Update Success!"})
} catch (err) {
  return res.status(500).json({msg: err.message})
}
});

export const UpdateUsers = asyncHandler(async (req, res) => {
  const {
    workplace,
    favorite,
    about,
    beverage,
    avatar,
    id,
  } = req.body;
  const response = await Profile.updateOne({ person: id }, {
    workplace, favorite, about, beverage, avatar
  });
  if (response) {
    res.send({ success: true });
  } else {
    res.send({ success: false, err: 'Try again' });
  }
});





import Profile from '../models/modelProfile.js';
import asyncHandler from 'express-async-handler';

export const Users = asyncHandler(async(req, res) => {
  res.json('respond with a resource');
});

export const DetailUsers = asyncHandler(async (req, res) => {
  const state = req.body.state;
  try {
  const query = { user: state.user };
  const updateDocument = {
    $set: {
        name: state.name,
        doB: state.doB,
        workplace: state.workplace,
        favorite: state.favorite,
        about: state.about,
        beverage: state.beverage,
        avatar: state.avatar
    },
} 
  const insertedUser = await Profile.updateOne(query, updateDocument);
  res.json(insertedUser);
} catch(error) {
  console.error(error);
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




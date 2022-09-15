import bcrypt from 'bcrypt';
import Person from '../models/modelPerson.js'; 
import Profile from '../models/modelProfile.js';
import tryCatch from './utils/tryCatch.js';

export const Users = tryCatch(async(req, res) => {
  res.send('respond with a resource');
});

export const DetailUsers = tryCatch(async (req, res) => {
  const {
    name,
    doB,
    workplace,
    favorite,
    about,
    beverage,
    avatar,
    id,
  } = req.body;
  const user = await Person.findOne({ _id: id }).exec();
  if (!user.profileId) {
    const newProfile = await Profile.create({
      person: id,
      name,
      doB,
      workplace,
      favorite,
      about,
      beverage,
      avatar,
    });
    await Person.updateOne(user, { $set: { profileId: newProfile._id } });
    return res.send({
      success: true,
    });
  }
  await Person.updateOne({ _id: user.profileId }, {
    $set: {
      workplace,
      favorite,
      about,
      beverage,
      avatar,
    },
  });
});

export const UpdateUsers = tryCatch( async (req, res) => {
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

export const DeleteUsers = tryCatch(async (req, res) => {
  const id  = req.params.id;
  const user = await Person.findById(id).exec();
  if (!user) {
    return res.status(400).json("User not found");
  }
  const result = await user.deleteOne();
  const reply = `Note '${result.title}' with ID ${result._id} deleted`
  res.json(reply);
});


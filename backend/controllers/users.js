import bcrypt from 'bcrypt';
import Person from '../models/modelPerson.js'; 
import Profile from '../models/modelProfile.js';
import tryCatch from './utils/tryCatch.js';

export const Users = tryCatch(async(req, res) => {
  res.send('respond with a resource');
});

export const Register = tryCatch(async (req, res) => {
  const { nickname, email, password } = req.body;
  if (password.length < 6){
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  }
  if (nickname === '' || email === '' || password === '') {
      return res.status(400).json({
        success: false,
        err: 'Wrong data',
      });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Person.findOne({ email });
  if (!user) {
    const userNew = await Person.create({
      nickname,
      email,
      password:hashedPassword
    });
    return res.send({
      success: true,
      id: userNew._id,
    });
  }
  return res.status(400).json({
    success: false,
    err: 'Email is already registered',
  });
});

export const Login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await Person.findOne({ email});
  if (!user) {
  return res.status(404).json({ success: false, message: 'User does not exist!' });
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
  return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
  if (user) {
    const { profileId } = await Person.findOne({ email, password }).populate('profileId');
    return res.send({
      success: true,
      name: user.name,
      id: user._id,
      profileId,
    });
  }
  return res.status(400).json({
    success: false,
    err: 'No such user or incorrect pair login password',
  });

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


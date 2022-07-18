const router = require('express').Router();
const Person = require('../models/modelPerson'); 
const Profile = require('../models/modelProfile');


router.get('/listUsers', async (req, res) => {
  try {
  res.send('respond with a resource');
} catch (err) {
  console.error("Something went wrong")
  console.error(err)
}});

router.post('/login', async (req, res) => {
  try {
  const { email, password } = req.body;
  const user = await Person.findOne({ email, password });
  if (user) {
    const { profileId } = await Person.findOne({ email, password }).populate('profileId');
    return res.send({
      success: true,
      nickname: user.nickname,
      id: user._id,
      profileId,
    });
  }
  return res.send({
    success: false,
    err: 'No such user or incorrect pair login password',
  });
} catch (err) {
  console.error("Something went wrong")
  console.error(err)
}});

router.post('/registration', async (req, res) => {
  try {
  const { nickname, email, password } = req.body;
  if (nickname === '' || email === '' || password === '') {
    return res.send({
      success: false,
      err: 'Wrong data',
    });
  }
  const user = await Person.findOne({ email });
  if (!user) {
    const userNew = await Person.create({
      nickname,
      email,
      password,
    });
    return res.send({
      success: true,
      id: userNew._id,
    });
  }
  return res.send({
    success: false,
    err: 'Email is already registered',
  });
} catch (err) {
  console.error("Something went wrong")
  console.error(err)
}});

router.post('/profile', async (req, res) => {
  try {
  const {
    name,
    DoB,
    activity,
    topics,
    about,
    drinks,
    avatar,
    id,
  } = req.body;
  const user = await Person.findOne({ _id: id });
  if (!user.profileId) {
    const newProfile = await Profile.create({
      person: id,
      name,
      DoB,
      activity,
      topics,
      about,
      drinks,
      avatar,
    });
    // $set operator replaces the value of a field with the specified value.
    await Person.updateOne(user, { $set: { profileId: newProfile._id } });
    return res.send({
      success: true,
    });
  }
  await Person.updateOne({ _id: user.profileId }, {
    $set: {
      activity,
      topics,
      about,
      drinks,
      avatar,
    },
  });
} catch (err) {
  console.error("Something went wrong")
  console.error(err)
}});

router.patch('/profile', async (req, res) => {
  try {
  const {
    activity,
    topics,
    about,
    drinks,
    avatar,
    id,
  } = req.body;
  const response = await Profile.updateOne({ person: id }, {
    activity, topics, about, drinks, avatar
  });
  if (response) {
    res.send({ success: true });
  } else {
    res.send({ success: false, err: 'Try again' });
  }
} catch (err) {
  console.error("Something went wrong")
  console.error(err)
}});

router.post('/profileEdit', async (req, res) => {
  try {
  const { id } = req.body;
  const response = await Profile.findOne({ person: id });
  if (response) {
    res.send({ success: true, profileId: response });
  } else {
    res.send({ success: false, err: 'Something went wrong' });
  }
} catch (err) {
  console.error("Something went wrong")
  console.error(err)
}});

module.exports = router;
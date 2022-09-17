
import Person from '../models/modelPerson.js'; 
import Profile from '../models/modelProfile.js';
import tryCatch from './utils/tryCatch.js';

export const Users = tryCatch(async(req, res) => {
  res.send('respond with a resource');
});

export const DetailUsers = tryCatch(async (req, res) => {
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
  const insertedUser = await Person.updateOne(query, updateDocument);
  res.json(insertedUser);
} catch(error) {
  console.error(error);
}
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


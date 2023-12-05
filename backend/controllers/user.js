import Profile from "../models/Profile.js";

export const getUserById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.dob 
    ) {
      return res.status(400).send({
        message: 'Send all required fields: username, date of birth',
      });
    }
    const CreateProfile = {
      username: req.body.username,
      dob: req.body.dob,
      beverage: req.body.beverage,
      workplace: req.body.workplace,
      favorite: req.body.favorite,
      about: req.body.about
    };
    const profile = await Profile.create(CreateProfile);
    return res.status(201).send(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Profile.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Error' });
    }
    return res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

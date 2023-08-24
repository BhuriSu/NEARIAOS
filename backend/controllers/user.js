import Profile from "../models/modelProfile.js";

export const getUsers = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.send(profiles);
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.send(profile);
  } catch (error) {
    res.status(404).json({ 
      error: error.message
    });
  }
};

export const createUser = async (req, res) => {
  const { username, dob, beverage, workplace, favorite, about } = req.body;
  try {
    const profile = new Profile({ username, dob, beverage, workplace, favorite, about });
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(404).json({ 
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  const { username, dob, beverage, workplace, favorite, about } = req.body;
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, { username, dob, beverage, workplace, favorite, about }, { new: true });
    res.send(profile);
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
};

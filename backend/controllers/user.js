import Profile from "../models/modelProfile.js";

export const getUsers = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ 
      error: error.message
    });
  }
};

export const createUser = async (req, res) => {
  const { name, dob, beverage, workplace, favorite, about } = req.body;
  try {
    const profile = await Profile.create({ name, dob, beverage, workplace, favorite, about });
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ 
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  const { name, dob, beverage, workplace, favorite, about } = req.body;
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, { name, dob, beverage, workplace, favorite, about }, { new: true });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
};

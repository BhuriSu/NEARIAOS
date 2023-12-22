import Profile from "../models/Profile.js";

export const getUserById = async (req, res) => {
  try {
    const {id} = req.params;
    const profile = await Profile.findById(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    res.status(200).json(savedProfile);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};


export const updateUser = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Profile.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      res.status(404);
      throw new Error(`cannot find any profile with ID ${id}`);
    }
    const updatedProfile = await Profile.findById(id);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

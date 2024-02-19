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
    const imageUrl = 'your_firebase_image_url';
    const { username, date, workplace, beverage, favorite, about } = req.body;
    const newProfile = new Profile({username, date, workplace, beverage, favorite, about, image: imageUrl});
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

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProfile = await Profile.findById(id);
    if (!existingProfile) {
      res.status(404).json({ message: `User with ID ${id} not found.` });
      return;
    }
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (deletedProfile) {
      res.status(200).json({ message: `User with ID ${id} deleted successfully.` });
    } else {
      res.status(404).json({ message: `User with ID ${id} not found.` });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
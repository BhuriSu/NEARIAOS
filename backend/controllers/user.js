import Profile from "../models/Profile.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new Profile({
      username: req.body.username,
      date: req.body.date,
      beverage: req.body.beverage,
      workplace: req.body.workplace,
      favorite: req.body.favorite,
      about: req.body.about,
      profilePicture: req.body.profilePicture,
    });

    const savedUser = await newUser.save();
    res.status(201).json({savedUser});
    console.log({savedUser})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.userId; 
  const { profilePicture, username, date, workplace, beverage, favorite, about } = req.body;
  try {

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    
    const updatedUser = await Profile.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          date,
          beverage,
          workplace,
          favorite,
          about,
          profilePicture,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating profile' });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Profile.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User has been deleted', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting profile' });
  }
};
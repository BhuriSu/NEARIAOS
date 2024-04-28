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
  const id = req.params.id;
  console.log('Received userId:', id);
  try {
    const updatedUser = await Profile.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          date: req.body.date,
          beverage: req.body.beverage,
          workplace: req.body.workplace,
          favorite: req.body.favorite,
          about: req.body.about,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating profile' });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Profile.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User has been deleted', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting profile' });
  }
};
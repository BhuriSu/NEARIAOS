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
  try {
    const updatedUser = await Profile.findByIdAndUpdate(
      req.params.userId,
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
      { new: true },
    );
    console.log({ updatedUser });
    const { profilePicture, username, date, workplace, beverage, favorite, about } = updatedUser._doc;
    res.status(200).json({ profilePicture, username, date, workplace, beverage, favorite, about });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.userId);
    console.log({ deletedUser });
    res.status(200).json('User has been deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting profile' });
  }
};
import User from '../models/User.js';  // Assuming you have a Mongoose User model

// CREATE operation
export const createUser = async (req, res) => {
  try {
    const { username, date, beverage, workplace, favorite, about, profilePicture } = req.body;

    const newUser = new User({
      username,
      date,
      beverage,
      workplace,
      favorite,
      about,
      profilePicture
    });

    const savedUser = await newUser.save();  // Save the user using Mongoose

    res.status(201).json({ user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// READ operation
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);  // Use Mongoose to find user by ID

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// UPDATE operation
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, date, beverage, workplace, favorite, about, profilePicture } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        date,
        beverage,
        workplace,
        favorite,
        about,
        profilePicture
      },
      { new: true }  // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

// DELETE operation
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);  // Use Mongoose to delete user

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

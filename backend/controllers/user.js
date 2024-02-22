import Profile from "../models/Profile.js";
import { errorHandler } from '../utils/error.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await Profile.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { profilePicture, username, date, workplace, beverage, favorite, about } = user._doc;
    res.status(200).json(profilePicture, username, date, workplace, beverage, favorite, about);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await Profile.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating profile' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await Profile.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          profilePicture: req.body.profilePicture,
          username: req.body.username,
          date: req.body.date,
          beverage: req.body.beverage,
          workplace: req.body.workplace,
          favorite: req.body.favorite,
          about: req.body.about,
        },
      },
      { new: true }
    );
    const { profilePicture, username, date, workplace, beverage, favorite, about } = updatedUser._doc;
    res.status(200).json(profilePicture, username, date, workplace, beverage, favorite, about);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting profile' });
  }
};

import Profile from '../models/modelProfile.js';
import asyncHandler from 'express-async-handler';

export const UpdateUsers = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await Profile.findByIdAndUpdate(req.params.id, {
        $set: {
          name: formData.name,
          dob_day: formData.dob_day,
          dob_month: formData.dob_month,
          dob_year: formData.dob_year,
          workplace: formData.workplace,
          favorite: formData.favorite,
          beverage: formData.beverage,
          about: formData.about,
          avatar: formData.avatar,
          id: formData.id,
      },
      });
      if (!user) {
        return res.status(404).json({ msg: 'Profile not found' });
      }
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});







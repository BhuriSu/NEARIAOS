import Profile from "../models/modelProfile.js";

export const getUserById = async (req, res) => {
    try {
        const user = await Profile.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
      const updatedUser = await Profile.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            dob: req.body.dob,
            workplace: req.body.workplace,
            beverage: req.body.beverage,
            favorite: req.body.favorite,
            about: req.body.about
          },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Profile.deleteOne({_id:req.params.id});
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
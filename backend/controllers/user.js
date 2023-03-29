import Profile from "../models/modelProfile.js";

export const getUser = async (req, res) => {
    try {
        const user = await Profile.find();
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const getUserById = async (req, res) => {
    try {
        const user = await Profile.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    const user = new Profile({
        name: req.body.name,
        dob: req.body.dob,
        workplace: req.body.workplace,
        favorite: req.body.favorite,
        beverage: req.body.beverage,
        about: req.body.about,
    });
    try {
        const insertedUser = await user.save();
        res.status(201).json(insertedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await Profile.updateOne({_id:req.params.id}, {$set: 
        {
         workplace:req.body.workplace,
         beverage:req.body.beverage,
         favorite:req.body.favorite,
         about:req.body.about,
        }
    });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Profile.deleteOne({_id:req.params.id});
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
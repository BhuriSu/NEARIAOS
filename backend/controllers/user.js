import Profile from "../models/modelProfile";

export const getUserById = async (req, res) => {
    try {
        const user = await Profile.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    const user = new Profile(req.body);
    try {
        const insertedUser = await user.save();
        res.status(201).json(insertedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await Profile.updateOne({_id:req.params.id}, {$set: req.body});
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
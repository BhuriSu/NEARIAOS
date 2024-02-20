import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  beverage: { type: String },
  workplace: { type: String },
  favorite: { type: String },
  about: { type: String },
  imageUrl: String
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
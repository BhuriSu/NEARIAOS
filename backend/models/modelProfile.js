import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  beverage: { type: String, required: true },
  workplace: { type: String },
  favorite: { type: String },
  about: { type: String }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
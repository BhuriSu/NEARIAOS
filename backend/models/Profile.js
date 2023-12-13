import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter a username"] },
  dob: { type: Date, default: Date.now, required: true },
  beverage: { type: String },
  workplace: { type: String },
  favorite: { type: String },
  about: { type: String }
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
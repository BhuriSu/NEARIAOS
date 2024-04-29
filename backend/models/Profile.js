import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, unique: true},
  date: { type: Date, default: Date.now },
  beverage: { type: String },
  workplace: { type: String },
  favorite: { type: String },
  about: { type: String },
  profilePicture: {
    type: String,
  },
}
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
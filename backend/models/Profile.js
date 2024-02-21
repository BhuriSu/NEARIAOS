import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String },
  date: { type: Date, default: Date.now },
  beverage: { type: String },
  workplace: { type: String },
  favorite: { type: String },
  about: { type: String },
  profilePicture: {
    type: String,
    default:
      'C:\Users\Lenovo\Desktop\NEARIAOS\backend\tornado_cash.png',
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
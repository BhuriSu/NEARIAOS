import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  beverage: String,
  workplace: String,
  favorite: String,
  about: String,
  profilePicture: String
});

const User = mongoose.model('User', userSchema);

export default User;
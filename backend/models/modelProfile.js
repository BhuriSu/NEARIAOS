import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
  },
  dob: {
    type: Date,
  },
  workplace: {
    type: String,
    minlength: 1,
  },
  beverage: {
    type: String,
    minlength: 1,
  },
  favorite: {
    type: String,
    minlength: 1,
  },
  about: {
    type: String,
    minlength: 1,
  },
  latitude: Number,
  longitude: Number,
},
{
  versionKey: false,
});

export default mongoose.model('Profile', profileSchema);
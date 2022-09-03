import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  DoB: {
    type: Date,
    required: true,
  },
  activity: {
    type: String,
    required: true,
    minlength: 1,
  },
  about: {
    type: String,
    minlength: 1,
  },
  topics: String,
  drinks: String,
  avatar: String,
  latitude: Number,
  longitude: Number,
},
{
  versionKey: false,
});

const modelProfile = model('Profile', profileSchema);
export default modelProfile;
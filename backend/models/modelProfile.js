import pkg from 'mongoose';
const { Schema, model } = pkg;

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
  doB: {
    type: Date,
    required: true,
  },
  workplace: {
    type: String,
    required: true,
    minlength: 1,
  },
  about: {
    type: String,
    minlength: 1,
  },
  favorite: {
    type: String,
    minlength: 1,
  },
  beverage: {
    type: String,
    minlength: 1,
  },
  avatar: { type: String, default: '' },
  latitude: Number,
  longitude: Number,
},
{
  versionKey: false,
});

const modelProfile = model('Profile', profileSchema);
export default modelProfile;
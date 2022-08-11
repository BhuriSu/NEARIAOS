const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Profile', profileSchema);
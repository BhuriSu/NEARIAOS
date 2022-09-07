import pkg from 'mongoose';
const { Schema, model } = pkg;

const personSchema = new Schema(
  {
    nickname: { type: String, min: 2, max: 50, required: true },
    email:  {
      type: String,
      min: 5,
      max: 50,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
    chats: [
      {
        chat: String,
        nickname: String,
        date: Date,
        lastMessage: String,
      },
    ],
  },
  {
    versionKey: false,
  },
);

const modelPerson = model('Person', personSchema);
export default modelPerson;
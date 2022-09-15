import pkg from 'mongoose';
const { Schema, model } = pkg;

const personSchema = new Schema(
  {
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
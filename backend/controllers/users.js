
import Profile from '../models/modelProfile.js';
import asyncHandler from 'express-async-handler';
import MongoClient from 'mongodb';
const uri = process.env.MONGO_DB_URI

export const Users = asyncHandler(async(req, res) => {
  res.json('respond with a resource');
});

export const DetailUsers = asyncHandler(async (req, res) => {
  const client = new MongoClient(uri)
  const formData = req.body.formData

  try {
      await client.connect()
      const database = client.db('app-data')
      const users = database.collection('users')

      const query = {user_id: formData.user_id}

      const updateDocument = {
          $set: {
              name: formData.name,
              doB: formData.doB,
              workplace: formData.workplace,
              favorite: formData.favorite,
              beverage: formData.beverage,
              about: formData.about
          },
      }

      const insertedUser = await users.updateOne(query, updateDocument)

      res.json(insertedUser)

  } finally {
      await client.close()
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)

    } finally {
        await client.close()
    }
});

export const UpdateUsers = asyncHandler(async (req, res) => {
  const {
    workplace,
    favorite,
    about,
    beverage,
    avatar,
    id,
  } = req.body;
  const response = await Profile.updateOne({ person: id }, {
    workplace, favorite, about, beverage, avatar
  });
  if (response) {
    res.send({ success: true });
  } else {
    res.send({ success: false, err: 'Try again' });
  }
});







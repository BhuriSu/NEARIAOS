export const createUser = async (req, res) => {
  try {
    const { username, date, beverage, workplace, favorite, about, profilePicture } = req.body;
    await client.connect();
    const db = client.db('yourDatabaseName'); // Replace with your database name
    const users = db.collection('users');

    const newUser = {
      username,
      date,
      beverage,
      workplace,
      favorite,
      about,
      profilePicture
    };

    const result = await users.insertOne(newUser);

    res.status(201).json({ user: result.ops[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  } finally {
    await client.close();
  }
};

// READ operation
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    await client.connect();
    const db = client.db('yourDatabaseName');
    const users = db.collection('users');

    const user = await users.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  } finally {
    await client.close();
  }
};

// UPDATE operation
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, date, beverage, workplace, favorite, about, profilePicture } = req.body;

  try {
    await client.connect();
    const db = client.db('yourDatabaseName');
    const users = db.collection('users');

    const updatedUser = {
      $set: {
        username,
        date,
        beverage,
        workplace,
        favorite,
        about,
        profilePicture
      }
    };

    const result = await users.updateOne({ _id: new ObjectId(id) }, updatedUser);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = await users.findOne({ _id: new ObjectId(id) });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  } finally {
    await client.close();
  }
};

// DELETE operation
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await client.connect();
    const db = client.db('yourDatabaseName');
    const users = db.collection('users');

    const result = await users.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting user' });
  } finally {
    await client.close();
  }
};
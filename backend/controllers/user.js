import Profile from "../models/Profile.js";

const serviceAccount = require('../shonuvy-redunda-firebase-adminsdk-8mhb3-2c8f91d87f.json'); // Update with your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: import.meta.env.VITE_storageBucket // Update with your Firebase Storage bucket URL
});

export const getUserById = async (req, res) => {
  try {
    const {id} = req.params;
    const profile = await Profile.findById(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, date, workplace, beverage, favorite, about, image } = req.body;

    // Save image to Firebase Storage
    const bucket = admin.storage().bucket();
    const imageBuffer = Buffer.from(image, 'base64');
    const fileName = `profile_images/${Date.now()}.jpg`;
    const file = bucket.file(fileName);

    await file.save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg'
      }
    });

    // Get the public URL of the image
    const imageUrl = `https://storage.googleapis.com/${import.meta.env.VITE_storageBucket}/${fileName}`;

    // Save profile to MongoDB
    const profile = new Profile({
      username,
      date,
      workplace,
      beverage,
      favorite,
      about,
      imageUrl
    });

    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating profile' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, date, workplace, beverage, favorite, about, image } = req.body;

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        username,
        date,
        workplace,
        beverage,
        favorite,
        about,
        imageUrl: image ? await uploadImageToStorage(image) : undefined
      },
      { new: true }
    );

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    // Delete the image from Firebase Storage
    if (profile.imageUrl) {
      await deleteImageFromStorage(profile.imageUrl);
    }

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting profile' });
  }
};

// Helper function to upload image to Firebase Storage
async function uploadImageToStorage(image) {
  const bucket = admin.storage().bucket();
  const imageBuffer = Buffer.from(image, 'base64');
  const fileName = `profile_images/${Date.now()}.jpg`;
  const file = bucket.file(fileName);

  await file.save(imageBuffer, {
    metadata: {
      contentType: 'image/jpeg'
    }
  });

  return `https://storage.googleapis.com/${import.meta.env.VITE_storageBucket}/${fileName}`;
}

// Helper function to delete image from Firebase Storage
async function deleteImageFromStorage(imageUrl) {
  const imageUrlParts = imageUrl.split('/');
  const fileName = imageUrlParts[imageUrlParts.length - 1];
  const bucket = admin.storage().bucket();

  await bucket.file(`profile_images/${fileName}`).delete();
}
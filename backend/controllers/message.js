import Message from "../models/Messages.js";

export const getMessage = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

export const sendMessage = async (req, res) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
  
    try {
      const newMessage = new Message({ text });
      await newMessage.save();
      res.json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


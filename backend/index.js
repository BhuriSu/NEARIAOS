import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from "./routes/usersRouter.js";
import listsRouter from "./routes/listsRouter.js";
import messageRouter from "./routes/messageRouter.js";
import socketServer from "./socketServer.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { rateLimit } from 'express-rate-limit';

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const __dirname = path.resolve();
const app = express();
app.use(express.json());

// Create a Socket.IO instance attached to the HTTP server
const httpServer = createServer(app);
const io = new Server(httpServer);

// Handle connection event
io.on("connection", (socket) => socketServer(socket));

// when you want to use POST and PUT/PATCH method
app.use(express.urlencoded({ extended: false }));
// prevent CORS access error
app.use(cors());

// Define the rate limit middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
// Apply the rate limit to all requests
app.use(limiter);

// api 
app.use('/api/users', usersRouter);
app.use('/api/lists',listsRouter)
app.use('/api/messages',messageRouter)

app.get('/api/test', (req,res) =>{
  res.json({ message: 'API is working!' });
 });

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

httpServer.listen(5173, () => {
  console.log('Server is running!');
});
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import usersRouter from "./routes/usersRouter.js";
import listsRouter from "./routes/listsRouter.js";
import messageRouter from "./routes/messageRouter.js";
import socketServer from "./socketServer.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { rateLimit } from 'express-rate-limit'

const app = express();
dotenv.config();
const __dirname = path.resolve();
// prevent CORS access error
app.use(cors());
// Define the rate limit middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
// Apply the rate limit to all requests
app.use(limiter);

// Create a Socket.IO instance attached to the HTTP server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5000", "https://Neariaos.com"],
  },
});

// Handle connection event
io.on("connection", (socket) => socketServer(socket));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => console.log('server running on PORT ' + PORT));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// secure by setting various http headers
app.use(helmet());

// collect log http 
app.use(morgan('dev'));

// when you want to use POST and PUT/PATCH method
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// api 
app.use('/users', usersRouter);
app.use('/lists',listsRouter)
app.use('/messages',messageRouter)


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
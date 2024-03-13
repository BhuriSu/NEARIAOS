import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import { customRedisRateLimiter } from './middleware/index.js';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from "./routes/usersRouter.js";
import listsRouter from "./routes/listsRouter.js";
import messageRouter from "./routes/messageRouter.js";
import path from 'path';
import socketServer from "./socketServer.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();

// Handle 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Create a Socket.IO instance attached to the HTTP server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4000", "https://Neariaos.com"],
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

// implement rate limit
app.use(customRedisRateLimiter);

// prevent CORS access error
app.use(cors());
// api 
app.use('/users', usersRouter);
app.use('/lists',listsRouter)
app.use('/messages',messageRouter)

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
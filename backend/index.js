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

dotenv.config();
const app = express();

//secure by setting various http headers
app.use(helmet());

//prevent COR access error
app.use(cors());

// collect log http 
app.use(morgan('dev'));

//when you want to use POST and PUT/PATCH method
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api 
app.use('/users', usersRouter)
app.use('/lists',listsRouter)
app.use('/messages',messageRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// implement rate limit
app.use(customRedisRateLimiter);

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("MongoDB connected");
    }
  );

  const httpServer = createServer(app);
  // Create a Socket.IO instance attached to the HTTP server
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5000", "https://neariaos.com"],
    },
  });
  
  // Handle connection event
  io.on("connection", (socket) => {
    socketServer(socket);
  });

  httpServer.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });

  if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  }
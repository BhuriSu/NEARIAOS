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
import pgPool from './config/database.js';
import Sentry from './sentry.js';
import * as client from 'prom-client';
import errorHandler from './util/util.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const __dirname1 = path.resolve();
const app = express();

app.use(express.json());
// when you want to use POST and PUT/PATCH method
app.use(express.urlencoded({ extended: false }));
// prevent CORS access error
app.use(cors());

// Create a Socket.IO instance attached to the HTTP server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Handle connection event
io.on("connection", (socket) => socketServer(socket));

// Define the rate limit middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
// Apply the rate limit to all requests
app.use(limiter);

// PostgreSQL pool instance
app.use((req, res, next) => {
  req.pgPool = pgPool;
  next();
});

// api 
app.use('/api/users', usersRouter);
app.use('/api/lists',listsRouter)
app.use('/api/messages',messageRouter)

// --------------------------deployment------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/test", (req, res) => {
    res.send("API is running..");
  });
}

// set up sentry.io
app.use(errorHandler);
Sentry.init({ dsn: 'YOUR_SENTRY_DSN' }); // put https://your-public-key@your-sentry-domain/your-project-id inside YOUR_SENTRY_DSN

//set up prometheus 
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.get('/metrics', async (req,res)=> {
   res.setHeader("Content-Type", client.register.contentType);
   const metrics = await client.register.metrics();
   res.send(metrics);
});

//docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss (run for setting up grafana)
//docker run -d --name=loki -p 3100:3100 grafana/loki (run for setting up loki)


httpServer.listen(4000, () => {
  console.log('Server is running!');
});
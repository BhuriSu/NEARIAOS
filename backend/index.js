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
import * as client from 'prom-client';
import * as Sentry from "@sentry/node";

// Load environment variables from .env
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);  // Exit process if MongoDB connection fails
  });

// Initialize express app
const app = express();

// Setup middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cors()); // Enable CORS

// Setup rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter); // Apply rate limiting to all requests

// Setup Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Ensure CORS for Socket.IO
    methods: ["GET", "POST"],
  },
});

// Handle Socket.IO connection
io.on("connection", (socket) => socketServer(socket));

// Setup routes
app.use('/api/users', usersRouter);
app.use('/api/lists', listsRouter);
app.use('/api/messages', messageRouter);

// Serve static files in production
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html")));
} else {
  app.get("/test", (req, res) => res.send("API is running.."));
}

// Sentry configuration for error tracking
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler()); // Capture and handle errors

app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// Prometheus metrics collection
client.collectDefaultMetrics({ register: client.register });
app.get('/metrics', async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

// Start the server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

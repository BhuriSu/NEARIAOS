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
import * as client from 'prom-client';
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

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

Sentry.init({
  dsn: "https://6ee98e4fd244122817e24242135f42d2@o4507186093555712.ingest.us.sentry.io/4507186095194112",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    nodeProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

//*My laptop is not compatible*
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

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
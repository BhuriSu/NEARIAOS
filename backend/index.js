import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routes/userRouter.js";
import listsRouter from "./routes/listsRouter.js"; 
import databaseRouter from "./routes/databaseRouter.js";
import helmet from "helmet";
import express, { json, urlencoded } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//secure by setting various http headers
app.use(helmet());

//prevent COR access error
app.use(cors());

// collect log http 
app.use(morgan("dev"));

//when you want to use POST and PUT/PATCH method
app.use(json());
app.use(urlencoded({ extended: false }));

// session in server
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/database", databaseRouter);
app.use("/list", listsRouter); 

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

mongoose.connect(process.env.MONGO_DB_URI).
  catch(error => handleError(error));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => console.log(`Server running on port ${port}`))
});

mongoose.connection.on('error', err => {
  logError(err);
});
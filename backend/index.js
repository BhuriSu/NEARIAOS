import morgan from 'morgan';
import cors from 'cors';
import usersRouter from './routes/userRouter.js';
import listsRouter from './routes/listsRouter.js'; 
import helmet from 'helmet';
import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//secure by setting various http headers
app.use(helmet());

//prevent COR access error
const corsOptions = {
  origin: true, 
  credentials: true, 
};
app.use(cors(corsOptions));

// collect log http 
app.use(morgan('dev'));

//when you want to use POST and PUT/PATCH method
app.use(json());
app.use(urlencoded({ extended: false }));


app.use('/users', usersRouter);
app.use('/list', listsRouter); 

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

mongoose.connect(process.env.MONGO_DB_URI);
const db = mongoose.connection;
db.on("error", ()=>{console.log("Error connecting to db")});
db.once("open", function(){
  console.log("Successfully connection with db")
});

app.listen(4000, ()=>{
  console.log("Server running at 4000")
});

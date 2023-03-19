import createError from 'http-errors';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import { customRedisRateLimiter } from './middleware/index.js';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import usersRouter from "./routes/usersRouter.js";
import listsRouter from "./routes/listsRouter.js";

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'build');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.send(path.join(publicPath, 'index.html'));
});

// api 
app.use(usersRouter)
app.use(listsRouter)

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

mongoose.connect(process.env.MONGO_DB_URI);
const db = mongoose.connection;
db.on("error", ()=>{console.log("Error connecting to db")});
db.once("open", function(){
  console.log("Successfully connection with db")
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('server running on PORT ' + PORT));


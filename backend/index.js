import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import { customRedisRateLimiter } from './middleware/index.js';
import helmet from 'helmet';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import usersRouter from "./routes/usersRouter.js";
import listsRouter from "./routes/listsRouter.js";
import path from 'path';
import pgPromise from 'pg-promise';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'build');
app.use(express.static(path.join(__dirname, 'index.html')));
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.send(path.join(publicPath, 'index.html'));
});

// api 
app.use('/users',usersRouter)
app.use('/lists',listsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// implement rate limit
app.use(customRedisRateLimiter);

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

const pgp = pgPromise();
const pgConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};
const db = pgp(pgConfig);

db.connect()
  .then(() => console.log('Successfully connected to db'))
  .catch(() => console.log('Error connecting to db'));

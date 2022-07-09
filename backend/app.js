const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
);


const usersRouter = require('./routes/users');
const listRouter = require('./routes/list'); 
const databaseRouter = require('./routes/database');

const publicPath = path.join(__dirname, 'build');

const app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(publicPath));


app.use('/users', usersRouter);
app.use('/database', databaseRouter);
app.use('/list', listRouter); 

app.get('*', (req, res) => {
  res.send(path.join(publicPath, 'index.html'));
});


app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// : importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
// : app instance of express
const app = express();
const homeRoutes = require('./routes/homeRoute');
const tagRoutes = require('./routes/quotesTag');
const searchRoutes = require('./routes/searchRoute');

// : parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// : parse application/json
app.use(bodyParser.json());

// : use puclic folder as static server
app.use(express.static(path.join(__dirname, 'public')));

// : Allow cross origin
app.use(cors());

// : setting the app view engine to 'ejs'
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// : routes
app.use('/', homeRoutes);
app.use('/quotes', tagRoutes);
app.use('/quotes/search', searchRoutes);

// : middle not found
app.use(function(req, res, next) {
  let err = new Error('route not found');
  err.status = 404;
  next(err);
});

// : Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({err: {message: err.message}});
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app is start listening');
});

const axios = require('axios');
const rn = require('random-number');
const express = require('express');
const router = express.Router();

const url = 'http://www.quotesapi.ml/quotes';

let options1 = {
  min: 0,
  max: 99,
  integer: true,
};

let options2 = {
  min: 0,
  max: 29,
  integer: true,
};

// : random number generator
// : quote generator
router.get('/', (req, res, next) => {
  let random_page_number_param = '?page=' + rn(options1);
  let random_quote_number = rn(options2);
  console.log(random_page_number_param);
  console.log(random_quote_number);

  axios
    .get(url + random_page_number_param)
    .then(response => {
      res.json(response.data.quotes[random_quote_number]);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
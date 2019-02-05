const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
router.get('/:query', (req, res, next) => {
  console.log(req.params.query);
  let quotes = [];
  axios
    .get('https://www.goodreads.com/quotes/search', {
      params: {q: req.params.query},
    })
    .then(resp => {
      const $ = cheerio.load(resp.data);
      $('.quote.mediumText').each((i, el) => {
        data = {
          img: $(el)
            .find('img')
            .attr('src'),
          quote: $(el)
            .find('.quoteText')
            .text()
            .trim()
            .split('\n')[0],
          author: $(el)
            .find('.authorOrTitle')
            .text()
            .trim(),
        };

        quotes.push(data);
      });

      if (quotes.length < 1) {
        let err = new Error('Search query Not found');
        err.status = 404;
        next(err);
      } else {
        res.json(quotes);
      }
    })
    .catch(error => {
      let err = new Error(error);
      err.status = 404;
      next(err);
    });
});
router.get('/:query/page/:id', (req, res, next) => {
  let quotes = [];
  axios
    .get('https://www.goodreads.com/quotes/search', {
      params: {q: req.params.query, page: req.params.id},
    })
    .then(resp => {
      const $ = cheerio.load(resp.data);
      $('.quote.mediumText').each((i, el) => {
        data = {
          img: $(el)
            .find('img')
            .attr('src'),
          quote: $(el)
            .find('.quoteText')
            .text()
            .trim()
            .split('\n')[0],
          author: $(el)
            .find('.authorOrTitle')
            .text()
            .trim(),
        };
        quotes.push(data);
      });

      if (quotes.length < 1) {
        let err = new Error('Search query Not found');
        err.status = 404;
        next(err);
      } else {
        res.json(quotes);
      }
    })
    .catch(error => {
      let err = new Error(error);
      err.status = 404;
      next(err);
    });
});

module.exports = router;

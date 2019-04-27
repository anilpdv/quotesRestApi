const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res, next) => {
  if (!req.query.page) {
    req.query.page = 1;
  }
  let quotesJson = {
    quotes: []
  };
  axios
    .get('https://www.goodreads.com/quotes/search', {
      params: {
        q: req.query.q,
        page: req.query.page
      },
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

        quotesJson.quotes.push(data);
      });

      if (quotesJson.quotes.length < 1) {
        let err = new Error(
          'Search query Not found or page limit exceeded ! please try again.',
        );
        err.status = 404;
        next(err);
      } else {
        res.json(quotesJson);
      }
    })
    .catch(error => {
      console.log(error);
      let err = new Error(error);
      err.status = 404;
      next(err);
    });
});

router.get('/:query/page/:id', (req, res, next) => {
  let quotesJson = {
    quotes: []
  };
  axios
    .get('https://www.goodreads.com/quotes/search', {
      params: {
        q: req.params.query,
        page: req.params.id
      },
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
        quotesJson.quotes.push(data);
      });

      if (quotesJson.quotes.length < 1) {
        let err = new Error('Search query Not found');
        err.status = 404;
        next(err);
      } else {
        res.json(quotesJson);
      }
    })
    .catch(error => {
      let err = new Error(error);
      err.status = 404;
      next(err);
    });
});

module.exports = router;
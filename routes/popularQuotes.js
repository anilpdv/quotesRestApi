const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const {
  transformImage
} = require('../utils/transformUlr');

// @route : '/'
// @desc  : returns json of popular quotes
// @access: public
router.get('/', (req, res, next) => {
  if (!req.query.page) {
    req.query.page = 1;
  }

  let quotesJson = {
    quotes: []
  };
  // : req to goodreads website
  axios
    .get('https://www.goodreads.com/quotes', {
      params: {
        format: 'json',
        page: req.query.page
      },
    })
    .then(resp => {
      // : scrape the data
      const $ = cheerio.load(resp.data.content_html);
      $('.quoteContainer').each((i, el) => {
        data = {
          img: transformImage(el),
          author: $(el)
            .find('.quoteAuthor')
            .text()
            .trim(),
          quote: $(el)
            .find('.quoteBody')
            .text()
            .trim(),
        };

        // : push every quote
        quotesJson.quotes.push(data);
      });
      quotesJson.req_info = {
        page: resp.data.page,
        per_page: resp.data.per_page,
        num_results: resp.data.num_results,
        total_page: resp.data.total_pages
      }

      if (quotesJson.quotes.length < 1) {
        let err = new Error(
          'Search query Not found or page limit exceeded! please try again.',
        );
        err.status = 404;
        next(err);
      } else {
        res.json(quotesJson);
      }

    })
    .catch(err => {
      console.log(err);
    });
});

// @route : /:page
// @desc  : returns json of popular quotes
// @access: public
router.get('/page/:pageId', (req, res, next) => {
  let quotesJson = {
    quotes: []
  };
  // : req to goodreads website
  axios
    .get('https://www.goodreads.com/quotes', {
      params: {
        format: 'json',
        page: req.params.pageId
      },
    })
    .then(resp => {
      // : scrape the data
      const $ = cheerio.load(resp.data.content_html);
      $('.quoteContainer').each((i, el) => {
        data = {
          img: transformImage(el),
          author: $(el)
            .find('.quoteAuthor')
            .text()
            .trim(),
          quote: $(el)
            .find('.quoteBody')
            .text()
            .trim(),
        };
        // : push every quote
        quotesJson.quotes.push(data);
      });
      //  : adding req_info information
      quotesJson.req_info = {
        page: resp.data.page,
        per_page: resp.data.per_page,
        num_results: resp.data.num_results,
        total_page: resp.data.total_pages
      }

      if (quotesJson.quotes.length < 1) {
        let err = new Error(
          'Search query Not found or page limit exceeded! please try again.',
        );
        err.status = 404;
        next(err);
      } else {
        res.json(quotesJson);
      }
      //    ;
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
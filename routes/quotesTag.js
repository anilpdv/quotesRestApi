const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');

const transformImage = el => {
  const $ = cheerio.load(el);
  let img = $(el)
    .find('.userIcon')
    .attr('style');
  if (img) {
    return img
      .replace('background-image', '')
      .replace(': url(', '')
      .replace(');', '');
  } else {
    return 'https://images.gr-assets.com/quotes/1485615280p8/9884.jpg';
  }
};
// @route : '/'
// @desc  : returns json of popular quotes
// @access: public
router.get('/', (req, res) => {
  let quotes = [];
  // : req to goodreads website
  axios
    .get('https://www.goodreads.com/quotes', {
      params: {format: 'json'},
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
        quotes.push(data);
      });
      // : send json of data
      res.json(quotes);
    })
    .catch(err => {
      console.log(err);
    });
});
// @route : /:page
// @desc  : returns json of popular quotes
// @access: public
router.get('/page/:pageId', (req, res) => {
  let quotes = [];
  // : req to goodreads website
  console.log(req.params);
  console.log(req.query);
  axios
    .get('https://www.goodreads.com/quotes', {
      params: {format: 'json', page: req.params.pageId},
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
        quotes.push(data);
      });
      //    ;
      // : send json of data
      res.json(quotes);
    })
    .catch(err => {
      console.log(err);
    });
});
// @route : /tag/:category
// @desc  : returns json of popular quotes
// @access: public
router.get('/tag/:category', (req, res) => {
  let quotes = [];
  // : req to goodreads website
  axios
    .get(`https://www.goodreads.com/quotes/tag/${req.params.category}`, {
      params: {format: 'json'},
    })
    .then(resp => {
      // : scrape the data
      const $ = cheerio.load(resp.data.content_html);
      $('.quoteContainer').each((i, el) => {
        data = {
          img: $(el)
            .find('.userIcon')
            .attr('style'),
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
        quotes.push(data);
      });
      // : send json of data
      res.json(quotes);
    })
    .catch(err => {
      console.log(err);
    });
});
// @route : /tag/:category/page/:page
// @desc  : returns json of popular quotes
// @access: public
router.get('/tag/:category/page/:pageId', (req, res) => {
  let quotes = [];
  // : req to goodreads website
  axios
    .get(`https://www.goodreads.com/quotes/tag/${req.params.category}`, {
      params: {format: 'json', page: req.params.pageId},
    })
    .then(resp => {
      // : scrape the data
      const $ = cheerio.load(resp.data.content_html);
      $('.quoteContainer').each((i, el) => {
        data = {
          img: $(el)
            .find('.userIcon')
            .attr('style'),
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
        quotes.push(data);
      });
      // : send json of data
      res.json(quotes);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;

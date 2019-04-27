const cheerio = require('cheerio');

module.exports.transformImage = el => {
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
    return 'https://images.gr-assets.com/quotes/1387503187p2/10554.jpg';
  }
};

const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/developer', function(req, res) {
  res.render('developer');
});
module.exports = router;

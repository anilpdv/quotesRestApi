const router = require("express").Router();

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/home", function (req, res) {
  res.render("home");
});

router.get("/developer", function (req, res) {
  res.render("developer");
});

router.get("/privacy-policy", function (req, res) {
  res.render("privacyPolicy");
});
module.exports = router;

var express = require('express');
var router = express.Router();

/* GET generated memes. */
router.get('/', function(req, res, next) {
  res.render('generated');
});

module.exports = router;


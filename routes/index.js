var express = require('express');
var router = express.Router();
let properties= require("./properties")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/Properties",properties)

module.exports = router;

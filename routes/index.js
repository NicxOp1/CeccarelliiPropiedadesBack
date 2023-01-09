var express = require('express');
var router = express.Router();
let properties= require("./properties")
let user = require('./users')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/Properties",properties)
router.use("/user",user)


module.exports = router;

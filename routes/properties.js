let router=require('express').Router()

let {read} = require('../controllers/property')


router.get('/',read)

module.exports = router;

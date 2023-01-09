let  router = require('express').Router()
let {register,entry,loginWithToken, unlogin,readUserData, updateUserData} = require('../controllers/user')
const validator = require('../middlewares/validator')
const accountExists = require('../middlewares/accountExistsSignUp')
const schema = require('../schemas/user')
const schemaSignIn = require ('../schemas/signIn')
const mustSignIn =  require ('../middlewares/mustSignIn')
const accountExistsSignIn = require('../middlewares/accountExistsSignIn')
const passport = require ('../config/passport')
const accountHasBeenVerified = require('../middlewares/accountHasBeenVerified')

router.post('/',validator(schema), accountExists,register)

router.post('/signin',validator(schemaSignIn), accountExistsSignIn,accountHasBeenVerified ,entry)
router.post('/token', passport.authenticate("jwt", { session: false }), mustSignIn, loginWithToken);
router.put("/signout",passport.authenticate("jwt", { session: false }),unlogin);
router.get('/me/:id',passport.authenticate("jwt", { session: false }) ,readUserData)
router.patch('/me/:id',passport.authenticate("jwt", { session: false }),validator(schema),updateUserData)

module.exports = router
var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const user_controller = require('../controllers/usercontroller');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.redirect('/login');
});*/

//Login
router.get('/', user_controller.user_login_get);

router.post('/', user_controller.user_login_post);

router.get('/register', user_controller.user_register_get);
router.post('/register', user_controller.user_register_post);

// Logout
router.get('/logout', user_controller.user_logout_get);

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/users');
};

module.exports = router;

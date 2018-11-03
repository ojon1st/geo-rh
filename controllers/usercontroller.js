var User = require('../models/user');

var async = require('async');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');



/*
exports.user_list = function(req, res, next) {
    // Get all authors and genres for form
    async.parallel({
        users: function(callback) {
            User.find()
                .exec(callback);
        },
        
    }, function(err, results) {
        console.log(results);
        /*res.render('plateforme/classe', { title: 'Liste des utilisateurs', users_list:results.users});*//*
    });
};
*/


// Display and post Login page

exports.user_login_get = function(req, res, next){
    res.render('index', {title:'Accueil' });
};

exports.user_logout_get = function(req, res, next){
    req.logout();
    /*req.flash('success', 'Vous êtes maintenant déconnecté');*/
    res.redirect('/');
};
exports.user_login_post = [
   
    body('matricule', 'Veuillez renseigner votre matricule').isLength({ min: 1 }).trim(),
    passport.authenticate('local',{failureRedirect:'/', failureFlash:'Votre Pseudo ou mot de passe est incorrect.'}),
    (req, res, next) => {
       console.log('login...')
        req.flash('success', 'Vous êtes maintenant connecté');
        console.log('Vous êtes maintenant connecté');
        res.redirect('/users');
        
    }
];

exports.user_register_get = function (req, res, next){
    res.render('signup');
};
exports.user_register_post = [
     // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        //var dob = new Date(Date.UTC(req.body.year, req.body.month-1, req.body.day, 0, 0, 0));
        //console.log(dob.); return;
        // Create a genre object with escaped and trimmed data.
        var user = new User({
            prenom:req.body.prenom,
            nom:req.body.nom,
            matricule:req.body.matricule,
            password:req.body.password,
            cege:req.body.cege

        });
        /*if (!req.body.password === req.body.confirm_password) {
            return res.render('users/signup', {
                errors: 'Ressaisir votre mot de passe'
            });
        }*/
        //console.log(user); return;
        if (!errors.isEmpty()) {

            // There are errors. Render the form again with sanitized values/error messages.
            res.render('signup', {
                title: 'register',
                user: user,
                errors: errors.array()
            });
            return;
        } else {
            async.parallel({
                matricule: function (callback) {
                    User.findOne({'matricule': req.body.matricule}).exec(callback);
                }
            }, function (err, founduser) {
                if (err) {
                    return next(err);
                }
                
                
                if (founduser.matricule) {
                    // User exists, with same email.
                    req.flash('error', 'Le matricule saisi existe déjà. Merci de vous authentifier si vous en êtes le propriétaire');
                    res.render('signup', {
                        title: 'register',
                        user: user
                    });
                    return;
                } else {
                    
                    user.save(function (err) {
                        if (err) {

                            // Duplicate user
                            if (err && err.code === 11000) {
                                console.log(err)
                                req.flash('error', 'Cet utilisateur existe déjà');
                                res.render('signup', {title: 'register', user: user, errors: errors.array()});
                                return next(err);
                            }

                        }
                        //res.redirect('/users/profil/'+user.userrole);
                        res.redirect('/');

                    });


                }
            });
        }
    }
];

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy({
    usernameField: 'matricule',
    passwordField: 'password'
    
}, function(username, password, done){
    
    User.findOne({'matricule': username})
                .exec(function(err, found_user) {
                     if (err) throw err;//{ return next(err); }
                     if(!found_user){
                         return done(null, false, {message:'L\'utilisateur ' + username + ' est inconnu'});
                     }
                     // User found and compare password.
                     found_user.comparePassword(password, found_user.password, function(err, isMatch){
                         if(err) return done(err);
                         if(isMatch){
                             return done(null, found_user);
                         } else{
                             return done(null, false, {message: 'Le mot de passe est invalide'});
                         }
                     });                    
                })
}));
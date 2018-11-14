
var Entite = require('../models/entite');

exports.entite_get = function (req, res, next) {
    Entite.find()
        .exec(function (err, entite) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('plateforme/formation_prevision', { title: 'Prévision des formations', entite:  entite});
        });
};
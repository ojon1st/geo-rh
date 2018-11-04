var TypeConge = require('../models/conges_type');
var Hierarchie = require('../models/hierarchie');
var User = require('../models/user');
const Newdemande = require('../models/dmd_conge');
var async = require('async');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');

var date;
var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var day = new Date().getDate();

if (day < 10) {
    day = '0' + day
}

if (month < 10) {
    month = '0' + month
}
date = day + '/' + month + '/' + year;

exports.demande_conge_page_get = function (req, res, next) {
    async.parallel({

        cts: function (callback) {
            TypeConge.find().exec(callback);
        },
    }, function (err, resultat) {
        res.render('plateforme/formulaires/demande_conge', {
            user: req.user,
            congestypes: resultat.cts
        }); //affiche le formulaire de demande de congé
    });
};
exports.demande_conge_page_post = [
    (req, res, next) => {
        var te = req.body.daterange;
        var newdemande = new Newdemande({
            Expediteur: req.body.userid,
            Type_conge: req.body.type_conge,
            Date_depart: te.substr(0, 10),
            Date_retour: te.substr(13, 23),
            Corps_demande: req.body.corps_d,
            Etat_demande: 'ouvert',
            Destinataire: {
               // AgentSup:'',
                Decision: 0,
                Date_validation: date
            },
            Date_envoi: date
        });
        //console.log('newdemande: ' + newdemande);

        async.parallel({
            hierarchie_agent: function (callback) {
                Hierarchie.findOne({
                    'titre': req.user.entite
                })
                    .exec(callback);
            },
        },function (err, resultat) {
            if (err) {
                return next(err)
            }
            console.log('hierarchie agent:'+ resultat.hierarchie_agent.titulaire);
            if (resultat.hierarchie_agent.titulaire == req.user._id) {
                async.waterfall([
                        function (done) {
                            entite_exp: Hierarchie.findOne({
                                'titre': req.user.entite
                            });
                            done(null, entite_exp);
                        },
                        function (entite_exp, done) {
                            Hierarchie.findOne({
                                'titre': entite_exp.parent
                            });
                            done(null, 'done');
                        }
                    ],
                    function (err, resultat2) {
                        if (err) throw new Error(err);
                        console.log('Agent est le titulaire de l\'entité');
                        newdemande.Destinataire.AgentSup[0]['AgentSup'] = resultat2.titulaire._id
                    });
            }
            else {
                //console.log('Agent titulaire:'+newdemande.Destinataire[0]['Statut']);
                newdemande.Destinataire[0]['AgentSup'] = resultat.hierarchie_agent.titulaire._id
            }


            if (newdemande.Destinataire.AgentSup != '') {
                console.log('4...........' + newdemande.Destinataire.AgentSup);
                newdemande.save(function (err) {
                    if (err) {
                        return next(err)
                    }
                    res.redirect('/users')
                })
            }


        });

    }
];


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
        /*res.render('plateforme/classe', { title: 'Liste des utilisateurs', users_list:results.users});*/
/*
    });
};
*/

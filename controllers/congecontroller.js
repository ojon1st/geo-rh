var TypeConge = require('../models/congestype');
var Hierarchie = require('../models/hierarchie');
var User = require('../models/user');
var Dmdconge = require('../models/dmd_conge');
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
            expediteur: req.body.userid,
            congestype: req.body.type_conge,
            date_depart: te.substr(0, 10),
            date_retour: te.substr(13, 23),
            corps_demande: req.body.corps_d,
            etat_demande: 'ouvert',
            destinataire: {
               // AgentSup:'',
                decision: 0,
                date_validation: date
            },
            date_envoi: date
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
                        newdemande.destinataire[0]['agentSup'] = resultat2.titulaire._id
                    });
            }
            else {
                //console.log('Agent titulaire:'+newdemande.Destinataire[0]['Statut']);
                newdemande.destinataire[0]['agentSup'] = resultat.hierarchie_agent.titulaire._id
            }


            if (newdemande.destinataire[0]['agentSup']  != '') {
                console.log('4...........' + newdemande.destinataire.agentSup);
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


exports.demande_conge_encour_get = function (req, res, next) {
    Dmdconge.find({'expediteur':req.user._id })
        .populate('user')
        .populate('congestype')
        .exec(function (err, encours) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('plateforme/conge_encours', { title: 'Mes congés en cours', en_cour:  encours});
        });
};



exports.conge_detail = function(req, res, next) {

    async.parallel({
        conge: function(callback) {

            Dmdconge.findById(req.params.id)
                .populate('congestype')
                .populate('user')
                .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.conge==null) { // No results.
            var err = new Error('conge not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('plateforme/conge_detail', { title: 'Détail', conge:  results.conge} );
    });

};
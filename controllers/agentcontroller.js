var User = require('../models/user');
var async = require('async');
var Entite = require('../models/entite');
var Cege = require('../models/f_cege');

var Smatrimoniale = require('../models/smatrimoniale');
var Etatagent = require('../models/etatagent');

exports.personnel_page_get = function (req, res, next) {
    User.find()
        .populate('entite')
        .populate('etatagent')
        .populate('cege')
        .exec(function (err, personnels) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('plateforme/personnel', { title: 'Personnel', personnel:  personnels});
        });
};

exports.retraites_page_get = function (req, res, next) {
    User.find({'etatagent':'5be42254fb6fc00d3af6aa50'})
        .populate('entite')
        .populate('cege')
        .exec(function (err, personnels) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('plateforme/retraites', { title: 'Les retraités', personnel:  personnels});
        });
};

exports.contractuel_page_get = function (req, res, next) {
    User.find({'etatagent':'5bea9dcffb6fc06239e26dbf'})
        .populate('entite')
        .populate('cege')
        .exec(function (err, personnels) {
            if (err) { return next(err); }
            // Successful, so render
            res.render('plateforme/contractuels', { title: 'Les contractuels', personnel:  personnels});
        });
};


exports.personnel_detail = function(req, res, next) {

    async.parallel({
        agent: function(callback) {

            User.findById(req.params.id)
                .populate('entite')
                .populate('smatrimoniale')
                .populate('cege')
                .populate('echelle')
                .populate('grade')
                .populate('echelon')
                .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.agent==null) { // No results.
            var err = new Error('Agent not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('plateforme/fiche_agent', { title: 'Fiche de l\'agent', agent:  results.agent} );
    });

};









// Create and Save a new Note
/*exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};*/

// Retrieve and return all notes from the database.
/*exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};*/

// Find a single agent with an Agent Id
exports.agent_page_get = (req, res) => {
    res.render('plateforme/page_agent');
    /*User.findById(req.user._id)
    .then(agent => {
        if(!agent) {
            return res.status(404).send({
                message: "Aucun agent n'existe avec le matricule " + req.user.matricule
            });            
        }
        res.render('/plateforme/page_agent');
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun agent n'existe avec le matricule " + req.user.matricule
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });*/
};



/*
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};*/
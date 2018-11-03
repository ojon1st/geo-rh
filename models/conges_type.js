// types de congès [{"nom" : "Congé de repos annuel"}, { "nom" : "Congé de maternité"},{ "nom" : "Congé de maladie"}, { "nom" : "Congé exceptionnel"},{ "nom" : "Congé sans traitement"}];
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CongestypeSchema = new Schema({
    nom: {
        type: String,
        required: true
    }
});

// Export model.
module.exports = mongoose.model('Congestype', CongestypeSchema);
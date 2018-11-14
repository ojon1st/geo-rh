// types de congès [{"nom" : "Congé de repos annuel"}, { "nom" : "Congé de maternité"},{ "nom" : "Congé de maladie"}, { "nom" : "Congé exceptionnel"},{ "nom" : "Congé sans traitement"}];
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EtatagentSchema = new Schema({
    titre: {
        type: String,
        required: true
    }
});

// Export model.
module.exports = mongoose.model('Etatagent', EtatagentSchema);
//Position de l'agent [{"nom" : "En Activité"},{ "nom" : "Mise à disposition"},{ "nom" : "En Détachement"}, { "nom" : "Disponibilité"},{ "nom" : "En position hors cadre"}, { "nom" : "Suspension de fonctions"},{ "nom" : "En position sous-les drapeaux"}, { "nom" : "En position de stage"}];

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FPositionSchema = new Schema({
    nom: {type: String, required: true}
});

// Export model.
module.exports = mongoose.model('FPosition', FPositionSchema);
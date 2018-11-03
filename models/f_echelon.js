//var Counter = require('../models/counter');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FEchelonSchema = new Schema({
    indice: {type: Number, required: true},
    nom: {type: String, required: true}
});

// Export model.
module.exports = mongoose.model('FEchelon', FEchelonSchema);
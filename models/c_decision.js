//var Counter = require('../models/counter');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CdecisionSchema = new Schema({
    code: {type: Number, unique: true, required: true},
    nom: {type: String, required: true}
});

//Décision | 0:Non traité | 1:Rejeté | 2:Approuvé 
// Export model.
module.exports = mongoose.model('Cdecision', CdecisionSchema);
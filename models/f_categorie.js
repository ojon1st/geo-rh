//var Counter = require('../models/counter');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FCategorieSchema = new Schema({
    nom: {type: String, required: true},
    max_echelle: {type: Number, required: true}
});

// Export model.
module.exports = mongoose.model('FCategorie', FCategorieSchema);
// var Counter = require('../models/counter');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const EntiteSchema = new Schema({
    titre:{type: String, required: true}
});

// Export model.
module.exports = mongoose.model('Entite', EntiteSchema);
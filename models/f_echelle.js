//var Counter = require('../models/counter');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FEchelleSchema = new Schema({
    numero: {type: Number, required: true}
});

// Export model.
module.exports = mongoose.model('FEchelle', FEchelleSchemaa);
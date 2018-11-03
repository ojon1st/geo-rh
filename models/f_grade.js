//var Counter = require('../models/counter');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FGradeSchema = new Schema({
    nom: {type: String, required: true},
    max_echelon: {type: Number, required: true}
});

// Export model.
module.exports = mongoose.model('FGrade', FGradeSchema);
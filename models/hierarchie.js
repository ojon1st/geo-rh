var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const HierarchieSchema = new Schema({
   titre:{type: Schema.ObjectId, ref: 'Entite', required: true},
   titulaire:{type: Schema.ObjectId, ref: 'User',required: true},
   parent:{type: Schema.ObjectId, ref: 'Entite', required: true}
});

// Export model.
module.exports = mongoose.model('Hierarchie', HierarchieSchema);
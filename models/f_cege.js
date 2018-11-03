// Liste des nivreaux d'avancement : A1-1er echelon, A2-2e echelon, D2-14e echelon
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FcegeSchema = new Schema({
  categorie: {type: Schema.ObjectId, ref: 'FCategorie', required: true},
  echelle: {type: Schema.ObjectId, ref: 'FEchelle', required: true},
  grade: {type: Schema.ObjectId, ref: 'FGrade', required: true},
  echelon: {type: Schema.ObjectId, ref: 'FEchelon', required: true},
  code_cege: {type: String, required: true}
});

// Export model.
module.exports = mongoose.model('Fcege', FcegeSchema);
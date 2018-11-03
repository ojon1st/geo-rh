//var Counter = require('../models/counter');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var C_Dest_Content = new Schema({
    C_Dest_A:{type: Schema.ObjectId, ref: 'User', required: true},
    C_Dest_Statut:{type: Boolean, default: false, required: true}, // Etat du courrier False = Non traité et True = Traité
    C_Dest_Decision:{type: Schema.ObjectId, ref: 'CDecision', required: true}, // Décision | 0:Non traité | 1:Rejeté | 2:Approuvé
    C_Dest_Motif:{type: String}, // Commentaire ou Motif de la décision
    C_Dest_Date:{type: Date}
});

var CourrierSchema = new Schema({
    C_Type: {type: String, required: true}, // Type du courrier, demande de congès etc
    C_Exp:{type: Schema.ObjectId, ref: 'User', required: true}, // Agent expéditeur
    C_Date:{type: Date, required: true}, // Date de validation / d'envoi du courrier
    C_Corps: {type: String, required: true}, // Corps du courrier, lettre de demande de congès etc
    C_Etat:{type: Boolean, default: false, required: true}, // Etat du courrier False = Ouvert et True = Fermé
    C_Dest:[C_Dest_Content]
});

// Export model.
//module.exports = mongoose.model('C_Dest_Content', C_Dest_ContentSchema);
module.exports = mongoose.model('Courrier', CourrierSchema);
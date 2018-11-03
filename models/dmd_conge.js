const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dmdcongeSchema = new Schema({
    Expediteur: {type: Schema.ObjectId,ref: 'User', required: true}, // Agent expéditeur
    Type_conge:{type: Schema.ObjectId, ref: 'conges_type', required: true}, // Type de congé
    Date_depart:{type: String, required: true}, // Date de départ en congé
    Date_retour:{type: String, required: true}, // Date de retour du congé
    Corps_demande:{type: String, required: true},
    Etat_demande:{type: String,default: 'ouvert', required: true}, //Etat de la demande par défaut est à ouvert
    Destinataire:[{
            AgentSup:{type:Schema.ObjectId,ref: 'User'},
            Decision:{type:Number,required:true},//Décision du supérieur 0=non traité,1=rejeté,2=approuvé  type: Schema.ObjectId,ref: 'Decision',
            Motif:{type:String,default:""},//commentaire du supérieur
            Date_validation:{type:String,required:true},
            Statut:{type:Boolean,required:true,default:false}//Etat du courrier false=non traité,true=traité
        }],
    Date_envoi:{type: String,required:true}
});


module.exports = mongoose.model('dmdconge', dmdcongeSchema);
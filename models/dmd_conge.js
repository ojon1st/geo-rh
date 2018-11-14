const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dmdcongeSchema = new Schema({
    expediteur: {type: Schema.ObjectId,ref: 'User', required: true}, // Agent expéditeur
    congestype:{type: Schema.ObjectId, ref: 'Congestype', required: true}, // Type de congé
    date_depart:{type: String, required: true}, // Date de départ en congé
    date_retour:{type: String, required: true}, // Date de retour du congé
    corps_demande:{type: String, required: true},
    etat_demande:{type: String,default: 'ouvert', required: true}, //Etat de la demande par défaut est à ouvert
    destinataire:[{
            agentSup:{type:Schema.ObjectId,ref: 'User'},
            decision:{type:Number,required:true},//Décision du supérieur 0=non traité,1=rejeté,2=approuvé  type: Schema.ObjectId,ref: 'Decision',
            motif:{type:String,default:""},//commentaire du supérieur
            date_validation:{type:String,required:true},
            statut:{type:Boolean,required:true,default:false}//Etat du courrier false=non traité,true=traité
        }],
    date_envoi:{type: String,required:true}
});

dmdcongeSchema
    .virtual('url')
    .get(function () {
        return 'encours/'+this._id;
    });

module.exports = mongoose.model('dmdconge', dmdcongeSchema);
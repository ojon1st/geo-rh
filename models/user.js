// fiche personnelle de l'agent;

//var Counter = require('../models/counter');
var bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
var SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    prenom: {type: String, required: true},
    nom: {type: String, required: true},
    matricule: {type: String, required: true},
    password: {type: String, required: true},
    entite:{type:Schema.ObjectId,ref: 'Entite', required:true},
    cege: {type: Schema.ObjectId, ref: 'Fcege', required: true},
    email: {type: String},
    profileimage:{type: String, default:''},
    genre:{type: String, default:'' },
    userdob:{type: String},
});

    //poste: {type: Schema.ObjectId, ref: 'FPoste', required: true},
		/*,userdoc:{type:Date, default:Date.now}*/
    //userrole:{type: String, default:'' },

UserSchema.pre('save', function(next){
    var doc = this;
    // only hash the password if it has been modified (or is new)
    if (!doc.isModified('password')){
        return next();
    } else{
        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(doc.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                doc.password = hash;
                next();
            });
        });
    }
});

// Virtual for this genre instance URL.
UserSchema
.virtual('url')
.get(function () {
  return 'users/mon-espace';
});

//UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.comparePassword = function(candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        //if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
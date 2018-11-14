const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SmatrimonialeSchema = new Schema({
    nom: {
        type: String,
        required: true
    }
});

// Export model.
module.exports = mongoose.model('Smatrimoniale', SmatrimonialeSchema);
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    mail: {
        type: String
    },
    zanimanje: {
        type: String
    },
    jmbg: {
        type: String
    },
    pol: {
        type: String
    },
    tip: {
        type: Number
    },
    slika: {
        type: String,
    },
    pitanje: {
        type: String
    },
    odgovor: {
        type: String
    }
   
});

export default mongoose.model('User', User);
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rang = new Schema({
    igra: {
        type: Number
    },
    datum:{
        type: String
    },
    poeni:{
        type: Number
    },
    username:{
        type: String
    }
   
});

export default mongoose.model('Rang', Rang);
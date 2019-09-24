import mongoose from 'mongoose';
import Anagram from './anagram';

const Schema = mongoose.Schema;

let Igra = new Schema({
    igra: {
        type: Number
    },
    anagram1: {
        type: String
    },
    anagram2: {
        type: String
    },
    datum:{
        type: String
    }
   
});

export default mongoose.model('Igra', Igra);
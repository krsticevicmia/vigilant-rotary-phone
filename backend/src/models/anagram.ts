import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Anagram = new Schema({
    zagonetka: {
        type: String
    },
    resenje: {
        type: String
    }
   
});

export default mongoose.model('Anagram', Anagram);
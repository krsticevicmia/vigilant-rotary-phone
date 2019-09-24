import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Geografija = new Schema({
    slovo: {
        type: String
    },
    odgovori:  [
             { kategorija: String,
                termini : 
                [
                 {
                    termin: String
                 }
                ] 
             }
    ]
   
});

export default mongoose.model('Geografija', Geografija);
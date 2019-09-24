import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Provera = new Schema({
   
    datum:{
        type: String
    },
    slovo:{
        type: String
    },
    username:{
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
    ],
    poeni : Number
   
});

export default mongoose.model('Provera', Provera);
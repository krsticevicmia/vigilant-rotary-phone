import { Odgovor } from './odgovor.model';

export interface Provera {
   
    datum: String,
    slovo: String,
    username: String,
    odgovori: Array<Odgovor>,
    poeni: number
}


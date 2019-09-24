import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/users');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

import User from './models/user';
import Requser from './models/requsers'
import Anagram from './models/anagram'
import { request } from 'http';
import Geografija from './models/geografija';
import Igra from './models/igra';
import Rang from './models/rang';
import Provera from './models/provera';

router.route('/login').post(
    (req, res)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username':username, 'password':password},
         (err,user)=>{
            if(err) console.log(null);
            else res.json(user);
        })
    }
);

router.route('/register').post((req, res)=>{
    let requser = new Requser(req.body);
    requser.save().
        then(requser=>{
            res.status(200).json({'requser':'ok'});
        }).catch(err=>{
            res.status(400).json({'requser':'no'});
        })
});

router.route('/saveUser').post((req, res)=>{
    let user = new User(req.body);
    user.save().
        then(requser=>{
            res.status(200).json({'requser':'ok'});
        }).catch(err=>{
            res.status(400).json({'requser':'no'});
        })
});

router.route('/news').get((req, res)=>{
    User.findOne({'username':'admin'}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user.get('news'));
        }
    })
});

router.route('/requests').get( (req, res) => {
    Requser.find({}, (err, requests) => {
        if (err)
            console.log(err)
        else
            res.json(requests)
    })
});

router.route('/findUser').post(
    (req, res)=>{
        let username = req.body.username;

        User.findOne({'username':username},
         (err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
);

router.route('/findRequser').post(
    (req, res)=>{
        let username = req.body.username;

        Requser.findOne({'username':username},
         (err,requser)=>{
            if(err) res.json(null);
            else res.json(requser);
        })
    }
);

router.route('/getandremoveRequser').post((req, res) => {
    Requser.findOneAndRemove({ username: req.body.username }, (err, room) => {
        if (err || !room) {
            res.json('Error');
        } else {
            res.json(room);
        }
    });
});

router.route('/changeUserPass').post((req, res) => {
   User.findOneAndUpdate({ username: req.body.username },
     {password: req.body.password}, (err, re) => {
        if(err) res.json(null);
        else res.json(re);
    });

});

router.route('/getGeografija').post((req, res)=>{
    Geografija.findOne({slovo:req.body.slovo}, (err, geo)=>{
        if(err){ 
            console.log(err);
            res.json(null);
        }
        else{
            res.json(geo);
        }
    })
});

router.route('/insertGeografija').post((req, res)=>{
    let geografija = new Geografija(req.body);
    geografija.save().
        then(requser=>{
            res.json(requser);
            
        }).catch(err=>{
            res.status(400).json({'requser':'no'});
        })
});

router.route('/updateGeografija').post((req, res) => {
    Geografija.findOneAndUpdate({ slovo: req.body.slovo },
      {odgovori: req.body.odgovori}, (err, re) => {
         if(err) res.json(null);
         else res.json(re);
     });
 
 });

router.route('/saveAnagram').post((req, res)=>{
    let anagram = new Anagram(req.body);
    anagram.save().
        then(requser=>{
            res.json(requser);
        }).catch(err=>{
            res.status(400).json({'requser':'no'});
        })
});

router.route('/getAnagrams').get( (req, res) => {
    Anagram.find({}, (err, anagrams) => {
        if (err)
            console.log(err);
        else
            res.json(anagrams);
    })
});

router.route('/saveIgra').post((req, res)=>{
    let igra = new Igra(req.body);
    igra.save().
        then(requser=>{
            res.json(requser);
        }).catch(err=>{
            res.status(400).json({'requser':'no'});
        })
});

router.route('/findDate').post((req,res)=>{
    Igra.findOne({datum:req.body.datum}, (err, igra)=>{
        if(err){ 
            console.log(err);
            res.json(null);
        }
        else{
            res.json(igra);
        }
    })
});

router.route('/findIgra').post((req,res)=>{
    Igra.findOne({datum:req.body.datum}, (err, igra)=>{
        if(err){ 
            console.log(err);
            res.json(null);
        }
        else{
            res.json(igra);
        }
    })
});

router.route('/findAnagram').post((req,res)=>{
    Anagram.findOne({resenje:req.body.resenje}, (err, anag)=>{
        if(err){ 
            console.log(err);
            res.json(null);
        }
        else{
            res.json(anag);
        }
    })
});

router.route('/findAnagramResenje').post((req,res)=>{
    Anagram.findOne({zagonetka:req.body.zagonetka}, (err, anag)=>{
        if(err){ 
            console.log(err);
            res.json(null);
        }
        else{
            res.json(anag);
        }
    })
});

router.route('/getGeos').get((req,res)=>{
    Geografija.find({}, (err, geos) => {
        if (err)
            console.log(err);
        else
            res.json(geos);
    })
});

router.route('/findGeos').post((req, res)=>{
    Geografija.findOne({'slovo':req.body.slovo, 'odgovori.kategorija' : req.body.kategorija,
    'odgovori.termini.termin': req.body.termin
   }, (err, geo)=>{
        if(err){ 
            console.log(err);
            res.json(null);
        }
        else{
            res.json(geo);
        }
    })
});

router.route('/saveRang').post((req, res)=>{
    let rang = new Rang(req.body);
    rang.save().
        then(requser=>{
            res.json(requser);
        }).catch(err=>{
            res.status(400).json({'requser':'no'});
        })
});

router.route('/getRang').post((req,res)=>{
    Rang.findOne({datum: req.body.datum, username: req.body.username}, (err, rangs) => {
        if (err)
            console.log(err);
        else
            res.json(rangs);
    })
});

router.route('/getRangs').post((req,res)=>{
    Rang.find({datum: req.body.datum}, (err, rangs) => {
        if (err)
            console.log(err);
        else
            res.json(rangs);
    })
});

router.route('/saveProvera').post((req, res)=>{
    let prov = new Provera(req.body);
    prov.save().
        then(provera=>{
            res.json(provera);
        }).catch(err=>{
            res.status(400).json({'requser':'no'});
        })
});

router.route('/getProvera').post((req,res)=>{
    Provera.findOne({datum: req.body.datum, username: req.body.username}, (err, rangs) => {
        if (err)
            console.log(err);
        else
            res.json(rangs);
    })
});

router.route('/getProveras').get( (req, res) => {
    Provera.find({}, (err, requests) => {
        if (err)
            console.log(err)
        else
            res.json(requests)
    })
});

router.route('/updateProvera').post((req, res) => {
    Provera.findOneAndUpdate({ datum: req.body.datum, username: req.body.username },
      {poeni: req.body.poeni}, (err, re) => {
         if(err) res.json(null);
         else res.json(re);
     });
 
 });

 router.route('/removeProvera').post((req, res) => {
    Provera.findOneAndRemove({ username: req.body.username, datum : req.body.datum }, (err, room) => {
        if (err || !room) {
            res.json('Error');
        } else {
            res.json(room);
        }
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/users');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
const user_1 = __importDefault(require("./models/user"));
const requsers_1 = __importDefault(require("./models/requsers"));
const anagram_1 = __importDefault(require("./models/anagram"));
const geografija_1 = __importDefault(require("./models/geografija"));
const igra_1 = __importDefault(require("./models/igra"));
const rang_1 = __importDefault(require("./models/rang"));
const provera_1 = __importDefault(require("./models/provera"));
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(null);
        else
            res.json(user);
    });
});
router.route('/register').post((req, res) => {
    let requser = new requsers_1.default(req.body);
    requser.save().
        then(requser => {
        res.status(200).json({ 'requser': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'requser': 'no' });
    });
});
router.route('/saveUser').post((req, res) => {
    let user = new user_1.default(req.body);
    user.save().
        then(requser => {
        res.status(200).json({ 'requser': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'requser': 'no' });
    });
});
router.route('/news').get((req, res) => {
    user_1.default.findOne({ 'username': 'admin' }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user.get('news'));
        }
    });
});
router.route('/requests').get((req, res) => {
    requsers_1.default.find({}, (err, requests) => {
        if (err)
            console.log(err);
        else
            res.json(requests);
    });
});
router.route('/findUser').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ 'username': username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/findRequser').post((req, res) => {
    let username = req.body.username;
    requsers_1.default.findOne({ 'username': username }, (err, requser) => {
        if (err)
            res.json(null);
        else
            res.json(requser);
    });
});
router.route('/getandremoveRequser').post((req, res) => {
    requsers_1.default.findOneAndRemove({ username: req.body.username }, (err, room) => {
        if (err || !room) {
            res.json('Error');
        }
        else {
            res.json(room);
        }
    });
});
router.route('/changeUserPass').post((req, res) => {
    user_1.default.findOneAndUpdate({ username: req.body.username }, { password: req.body.password }, (err, re) => {
        if (err)
            res.json(null);
        else
            res.json(re);
    });
});
router.route('/getGeografija').post((req, res) => {
    geografija_1.default.findOne({ slovo: req.body.slovo }, (err, geo) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(geo);
        }
    });
});
router.route('/insertGeografija').post((req, res) => {
    let geografija = new geografija_1.default(req.body);
    geografija.save().
        then(requser => {
        res.json(requser);
    }).catch(err => {
        res.status(400).json({ 'requser': 'no' });
    });
});
router.route('/updateGeografija').post((req, res) => {
    geografija_1.default.findOneAndUpdate({ slovo: req.body.slovo }, { odgovori: req.body.odgovori }, (err, re) => {
        if (err)
            res.json(null);
        else
            res.json(re);
    });
});
router.route('/saveAnagram').post((req, res) => {
    let anagram = new anagram_1.default(req.body);
    anagram.save().
        then(requser => {
        res.json(requser);
    }).catch(err => {
        res.status(400).json({ 'requser': 'no' });
    });
});
router.route('/getAnagrams').get((req, res) => {
    anagram_1.default.find({}, (err, anagrams) => {
        if (err)
            console.log(err);
        else
            res.json(anagrams);
    });
});
router.route('/saveIgra').post((req, res) => {
    let igra = new igra_1.default(req.body);
    igra.save().
        then(requser => {
        res.json(requser);
    }).catch(err => {
        res.status(400).json({ 'requser': 'no' });
    });
});
router.route('/findDate').post((req, res) => {
    igra_1.default.findOne({ datum: req.body.datum }, (err, igra) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(igra);
        }
    });
});
router.route('/findIgra').post((req, res) => {
    igra_1.default.findOne({ datum: req.body.datum }, (err, igra) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(igra);
        }
    });
});
router.route('/findAnagram').post((req, res) => {
    anagram_1.default.findOne({ resenje: req.body.resenje }, (err, anag) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(anag);
        }
    });
});
router.route('/findAnagramResenje').post((req, res) => {
    anagram_1.default.findOne({ zagonetka: req.body.zagonetka }, (err, anag) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(anag);
        }
    });
});
router.route('/getGeos').get((req, res) => {
    geografija_1.default.find({}, (err, geos) => {
        if (err)
            console.log(err);
        else
            res.json(geos);
    });
});
router.route('/findGeos').post((req, res) => {
    geografija_1.default.findOne({ 'slovo': req.body.slovo, 'odgovori.kategorija': req.body.kategorija,
        'odgovori.termini.termin': req.body.termin
    }, (err, geo) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(geo);
        }
    });
});
router.route('/saveRang').post((req, res) => {
    let rang = new rang_1.default(req.body);
    rang.save().
        then(requser => {
        res.json(requser);
    }).catch(err => {
        res.status(400).json({ 'requser': 'no' });
    });
});
router.route('/getRang').post((req, res) => {
    rang_1.default.findOne({ datum: req.body.datum, username: req.body.username }, (err, rangs) => {
        if (err)
            console.log(err);
        else
            res.json(rangs);
    });
});
router.route('/getRangs').post((req, res) => {
    rang_1.default.find({ datum: req.body.datum }, (err, rangs) => {
        if (err)
            console.log(err);
        else
            res.json(rangs);
    });
});
router.route('/saveProvera').post((req, res) => {
    let prov = new provera_1.default(req.body);
    prov.save().
        then(provera => {
        res.json(provera);
    }).catch(err => {
        res.status(400).json({ 'requser': 'no' });
    });
});
router.route('/getProvera').post((req, res) => {
    provera_1.default.findOne({ datum: req.body.datum, username: req.body.username }, (err, rangs) => {
        if (err)
            console.log(err);
        else
            res.json(rangs);
    });
});
router.route('/getProveras').get((req, res) => {
    provera_1.default.find({}, (err, requests) => {
        if (err)
            console.log(err);
        else
            res.json(requests);
    });
});
router.route('/updateProvera').post((req, res) => {
    provera_1.default.findOneAndUpdate({ datum: req.body.datum, username: req.body.username }, { poeni: req.body.poeni }, (err, re) => {
        if (err)
            res.json(null);
        else
            res.json(re);
    });
});
router.route('/removeProvera').post((req, res) => {
    provera_1.default.findOneAndRemove({ username: req.body.username, datum: req.body.datum }, (err, room) => {
        if (err || !room) {
            res.json('Error');
        }
        else {
            res.json(room);
        }
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map
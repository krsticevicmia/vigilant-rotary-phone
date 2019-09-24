"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Requser = new Schema({
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
exports.default = mongoose_1.default.model('Requser', Requser);
//# sourceMappingURL=requsers.js.map
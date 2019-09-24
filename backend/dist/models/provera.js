"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Provera = new Schema({
    datum: {
        type: String
    },
    slovo: {
        type: String
    },
    username: {
        type: String
    },
    odgovori: [
        { kategorija: String,
            termini: [
                {
                    termin: String
                }
            ]
        }
    ],
    poeni: Number
});
exports.default = mongoose_1.default.model('Provera', Provera);
//# sourceMappingURL=provera.js.map
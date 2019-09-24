"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    datum: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Igra', Igra);
//# sourceMappingURL=igra.js.map
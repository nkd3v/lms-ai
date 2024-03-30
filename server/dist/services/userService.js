"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.getUserByEmail = void 0;
const database_1 = __importDefault(require("../config/database"));
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = yield database_1.default.query(query, [email]);
            return result.rows[0] || null;
        }
        catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function insertUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email } = newUser;
            const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
            const result = yield database_1.default.query(query, [username, email]);
            return result.rows[0];
        }
        catch (error) {
            console.error('Error inserting user:', error);
            throw error;
        }
    });
}
exports.insertUser = insertUser;

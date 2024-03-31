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
exports.useGoogleStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_service_1 = require("../services/user.service");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
function useGoogleStrategy() {
    passport_1.default.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!profile._json.email)
                throw "User does not have email";
            let user = yield (0, user_service_1.getUserByEmail)(profile._json.email);
            if (user) {
                done(null, user);
            }
            else {
                console.log(profile);
                const newUser = {
                    email: profile._json.email,
                    name: profile._json.name,
                    given_name: profile._json.given_name,
                    family_name: profile._json.family_name,
                    picture_url: profile._json.picture,
                };
                user = yield (0, user_service_1.insertUser)(newUser);
                done(null, user);
            }
        }
        catch (err) {
            console.error(err);
            done(err);
        }
    })));
    passport_1.default.serializeUser(function (user, done) {
        done(null, user);
    });
    passport_1.default.deserializeUser(function (user, done) {
        done(null, user);
    });
}
exports.useGoogleStrategy = useGoogleStrategy;

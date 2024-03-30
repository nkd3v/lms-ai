"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/database");
const express_1 = __importDefault(require("express"));
var path = require('path');
const express_session_1 = __importDefault(require("express-session"));
const authRouter_1 = require("./routes/authRouter");
const passport_google_oauth_1 = require("passport-google-oauth");
const passport_1 = __importDefault(require("passport"));
const jwtAuth_1 = require("./middleware/jwtAuth");
require('dotenv').config();
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));
app.get('/', function (req, res) {
    res.render('pages/auth');
});
const port = process.env.PORT;
app.listen(port, () => console.log('App listening on port ' + port));
var userProfile;
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.set('view engine', 'ejs');
app.get('/success', (req, res) => { (0, jwtAuth_1.jwtAuth)(); res.render('success', { user: req.user }); });
app.get('/error', (req, res) => res.send("error logging in"));
passport_1.default.serializeUser((user, cb) => cb(null, user));
passport_1.default.deserializeUser((obj, cb) => cb(null, obj));
passport_1.default.use(new passport_google_oauth_1.OAuth2Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
}));
app.use('/auth', authRouter_1.authRouter);

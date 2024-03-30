"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Pool } = require('pg');
require('dotenv').config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});
function getPgVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const result = yield client.query('SELECT version()');
            console.log(result.rows[0]);
        }
        finally {
            client.release();
        }
    });
}
getPgVersion();
const express = require('express');
var path = require('path');
const app = express();
const session = require('express-session');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'IWwUC-67jxRApjK40V4NKXFgb4djMSjhrmrozQrjF-4'
}));
app.get('/', function (req, res) {
    res.render('pages/auth');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
const passport = require('passport');
var userProfile;
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '433744077393-62d5uchgmdaf2u0b220q84iuinvjd171.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
}));
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
});

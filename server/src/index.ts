// @ts-nocheck

import './config/database';

import express from 'express';
var path = require('path');
import session from 'express-session';
import { authRouter } from './routes/authRouter';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import passport from 'passport';
import { jwtAuth } from './middleware/jwtAuth'
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
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

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => { jwtAuth(); res.render('success', { user: req.user }) });
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.use('/auth', authRouter);
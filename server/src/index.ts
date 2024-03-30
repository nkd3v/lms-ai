import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/authRouter';
import { jwtAuth } from './middleware/jwtAuth';
import { useGoogleStrategy } from './config/passport.config';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));

app.get('/', function (req, res) {
  res.render('pages/auth');
});

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => { jwtAuth(req); res.render('success', { user: req.user }) });
app.get('/error', (req, res) => res.send("error logging in"));

useGoogleStrategy();

app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
import express from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { indexRouter } from './routes/index.route';
import { jwtAuth } from './middleware/jwtAuth';
import { useGoogleStrategy } from './config/passport.config';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

useGoogleStrategy();

app.use('/api/v1/uploads', express.static(__dirname + '/../uploads'));

app.use('/api/v1/', indexRouter);

app.get('/', function (req, res) {
  res.render('pages/auth');
});

app.get('/success', jwtAuth, (req, res) => { res.render('success', { user: req.user }) });
app.get('/error', (req, res) => res.send("error logging in"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
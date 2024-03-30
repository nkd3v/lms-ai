"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_route_1 = require("./routes/index.route");
const jwtAuth_1 = require("./middleware/jwtAuth");
const passport_config_1 = require("./config/passport.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true // Allows sending cookies
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_config_1.useGoogleStrategy)();
app.use(index_route_1.indexRouter);
app.get('/', function (req, res) {
    res.render('pages/auth');
});
app.get('/success', (req, res) => { (0, jwtAuth_1.jwtAuth)(req); res.render('success', { user: req.user }); });
app.get('/error', (req, res) => res.send("error logging in"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

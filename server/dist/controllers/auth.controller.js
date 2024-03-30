"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderErrorPage = exports.renderSuccessPage = exports.renderAuthPage = void 0;
const renderAuthPage = (req, res) => {
    res.render('pages/auth');
};
exports.renderAuthPage = renderAuthPage;
const renderSuccessPage = (req, res) => {
    res.send(req.user);
};
exports.renderSuccessPage = renderSuccessPage;
const renderErrorPage = (req, res) => {
    res.send("Error logging in");
};
exports.renderErrorPage = renderErrorPage;

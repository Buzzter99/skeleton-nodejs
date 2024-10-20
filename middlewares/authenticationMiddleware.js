const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const constants = require('../constants');
const JWT_SECRET = process.env.JWT_SECRET;
async function authenticationMiddleware(req,res,next) {
    const token = req.cookies ? req.cookies[constants.COOKIE_NAME] : null;
    if(!token) {
        return next();
    }
    let payload;
    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        res.clearCookie(constants.COOKIE_NAME);
        res.redirect('/users/login');
        return next();
    }
    req.user = payload;
    res.locals.user = payload;
    return next();
}
async function privateEndpoint(req,res,next) {
    const isLoggedIn = req.user;
    if(!isLoggedIn) {
        return res.redirect('/');
    }
    return next();
}
async function redirectIfLoggedIn(req,res,next) {
    if(req.user) {
        return res.redirect('/');
    }
    return next();
}
module.exports = {authenticationMiddleware,privateEndpoint,redirectIfLoggedIn}

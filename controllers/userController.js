const router = require('express').Router();
const {registerUser,loginUser} = require('../services/usersService');
const constants = require('../constants');
const {redirectIfLoggedIn, privateEndpoint} = require('../middlewares/authenticationMiddleware');
router.get('/login',redirectIfLoggedIn, async (req, res) => {
    res.render('login', {title: 'Login Page'});
});
router.post('/login', async (req, res) => {
    let token;
    try {
      token = await loginUser(req.body);
    } catch (error) {
      return res.render('login',{errorMsg: error, title: 'Login Page',...req.body});
    }
    res.cookie(constants.COOKIE_NAME, token, {httpOnly: true,maxAge: 2 * 60 * 60 * 1000});
    res.redirect('/');
})
router.get('/register',redirectIfLoggedIn, async (req, res) => {
    res.render('register', {title: 'Register Page'});
});
router.post('/register', async (req, res) => {
    try {
        await registerUser(req.body);
        const token = await loginUser(req.body);
        res.cookie(constants.COOKIE_NAME, token, {httpOnly: true,maxAge: 2 * 60 * 60 * 1000});
    } catch (error) {
        return res.render('register',{errorMsg: error, title: 'Register Page',...req.body});
    }
    res.redirect('/');
})
router.get('/logout',privateEndpoint, async (req, res) => {
    res.clearCookie(constants.COOKIE_NAME);
    res.redirect('/');
});
module.exports = router
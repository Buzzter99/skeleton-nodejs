const router = require('express').Router();
const userController = require('./controllers/userController');
const homeController = require('./controllers/homeController');
const volcanoController = require('./controllers/volcanoController');
router.use('/users',userController);
router.use('/',homeController);
router.use('/volcanoes',volcanoController);
router.all('*', (req, res) => {
    return res.render('404', { title: '404 Page' });
})
module.exports = {router};
const router = require('express').Router();
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');
router.get('/create',privateEndpoint, (req, res) => {
    res.render('create',{title: 'Create Volcano Page'});
})
module.exports = router
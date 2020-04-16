const {Router} = require('express');

const router = Router();
const User = require('../models/user');

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Authorization',
    })
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5e8c35cd8d930f18346b6fa6');
    req.session.user = user;
    req.session.isAuthenticated = true;

    req.session.save(err => {
        if (err) {
            throw new Error(err);
        } 
        res.redirect('/')
    })
    
})


module.exports = router;
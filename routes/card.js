const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

const mapCartItems = (cart) => {
    return cart.items.map(c => ({
        ...c.courseId._doc, count: c.count
    }))
}

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id);
    await req.user.addToCart(course);
    res.redirect('/card');
});

router.get('/', async (req, res) => {
    const user = await req.user.populate('cart.items.courseId')
    .execPopulate();    

    const courses = mapCartItems(user.cart);
    res.render('card', {
        title: 'Card',
        courses: courses,
        price: 0
    })
});

router.delete('/remove/:id', async (req, res) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate('cart.items.courseId').execPopulate();

    const courses = mapCartItems(user.cart);
    const cart = {
        courses, price: 0
    }

    res.status(200).json(cart);
});



module.exports = router;

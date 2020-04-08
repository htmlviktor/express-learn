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
    console.log(user)
    const courses = mapCartItems(user.cart);
    console.log(courses)
    res.render('card', {
        title: 'Card',
        courses: courses,
        price: 0
    })
});

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id);
    res.status(200).json(card);
});



module.exports = router;

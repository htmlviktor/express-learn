const {Router} = require('express');
const router = Router();

const Order = require('../models/order');


router.get('/', async (req, res) => {
    const orders = await Order.find({'user.userId': req.user._id})
        .populate('user.userId');
    
    res.render('orders', {
        title: 'Orders',
        orders: orders.map(o => ({
            ...o._doc,
            price: o.courses.reduce((total, c) => {
                return total += c.count * c.course.price
            }, 0)
        }))
    })
})


router.post('/', async (req, res) => {
    const user = await req.user.populate('cart.items.courseId').execPopulate();

    const courses = user.cart.items.map(it => ({
        count: it.count,
        course: {...it.courseId._doc}
    }))

    const order = new Order({
        user: {
            name: req.user.name,
            userId: req.user
        },
        courses
    })

    await order.save();
    await req.user.clearCart();
    res.redirect('/orders');
})

module.exports = router;
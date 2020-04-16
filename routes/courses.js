const {Router} = require('express');
const router = Router();
const Course = require('../models/course');
const User = require('../models/user');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    const courses = await Course.find().populate('userId', 'email name');
    
    res.render('courses', {
        title: 'All Courses',
        isCourses: true,
        courses: courses,
    });
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('course', {
        layout: 'empty',
        course
    });
});

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
        const course = await Course.findById(req.params.id);
        res.render('course-edit', {
            title: course.title,
            course
        })
});

router.post('/edit', auth, async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});

router.post('/add', auth, async (req, res) => {
    const course = await Course.getById(req.body.id);
    
    await User.addToCart(course);
    res.redirect('/card');
});

router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({_id: req.body.id});
        res.redirect('/courses');
    } catch (e) {
        throw new Error(e);
    }
});



module.exports = router;

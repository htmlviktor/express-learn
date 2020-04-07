const {Router} = require('express');
const Course = require('../models/course');
const router = Router();


router.get('/', async (req, res) => {
    const courses = await Course.find();
    console.log(courses)
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

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
        const course = await Course.findById(req.params.id);
        res.render('course-edit', {
            title: course.title,
            course
        })
});

router.post('/edit', async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);

    await Card.add(course);
    res.redirect('/card');
});



module.exports = router;

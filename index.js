const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');
const User = require('./models/user');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();


app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use( async (req, res, next) => {
    try {
        const user = await User.findById('5e8c35cd8d930f18346b6fa6');
        req.user = user;
        next();
    } catch (e) {
        throw new Error(e)
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/add',addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;


const start = () => {
        const url = `mongodb+srv://viktorkan:DyXco7h9UD1iFFee@cluster0-8lrxq.mongodb.net/shop`;
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }).then(async () => {
            const candidate = await User.findOne();
            if (!candidate) {
                const user = new User({
                    email: 'viktorkan@gmail.com',
                    name: 'Viktor',
                    cart: {items: []}
                })
                await user.save();
            }
            app.listen(PORT, () => {console.log(`Server is start on PORT: ${PORT}`)});
        });
};


start();

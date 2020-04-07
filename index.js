const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();


app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/add',addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;


const start = () => {
        const url = `mongodb+srv://viktorkan:DyXco7h9UD1iFFee@cluster0-8lrxq.mongodb.net/shop`;
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }).then(() => {
            app.listen(PORT, () => {console.log(`Server is start on PORT: ${PORT}`)});
        });
};


start();

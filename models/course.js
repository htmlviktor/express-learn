const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Course {
 constructor(title, price, img) {
     this._title = title;
     this._price = price;
     this._img = img;
     this._id = uuid();
 }

 toJSON() {
     return {
         title: this._title,
         price: this._price,
         img: this._img,
         id: this._id
     }
 }

 async save() {
    const courses = await Course.getAll();
    courses.push(this.toJSON());
    return new Promise(((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, '..', 'data', 'courses.json'),
            JSON.stringify(courses),
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    }))
 }

 static getAll() {
     return new Promise((resolve, reject) => {
         fs.readFile(
             path.join(__dirname, '..', 'data', 'courses.json'),
             'utf-8',
             (err, content) => {
                 if (err) {
                     reject(err)
                 } else {
                     resolve(JSON.parse(content));
                 }
             }
         )
     })
 }
}

module.exports = Course;

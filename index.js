require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , Sequelize = require('sequelize')
    , app = express();

app.use(bodyParser.json());

const sequelize = new Sequelize( process.env.DB, {
    dialect: 'mysql',
    dialectOptions: {
        ssl:true
    }
});

// const Students = sequelize.define('students', {
//     first_name: Sequelize.STRING,
//     last_name: Sequelize.STRING,
//  });
 
//  Students.sync({force: true}).then(() => {
//   return Students.bulkCreate([{
//     first_name: 'Harry',
//     last_name: 'Potter',
//   },{
//     first_name: 'Hermione',
//     last_name: 'Granger',
//   }, {
//     first_name: 'Ron',
//     last_name: 'Weasley',
//   },{
//     first_name: 'Draco',
//     last_name: 'Malfoy',
//   }, {
//     first_name: 'Seamus',
//     last_name: 'Finnigan',
//   },{
//     first_name: 'Neville',
//     last_name: 'Longbottom',
//   },{
//     first_name: 'Luna',
//     last_name: 'Lovegood',
//   },{
//     first_name: 'Oliver',
//     last_name: 'Wood',
//   }, {
//     first_name: 'Fred',
//     last_name: 'Weasley',
//   },{
//     first_name: 'George',
//     last_name: 'Weasley',
//   }, {
//     first_name: 'Ginny',
//     last_name: 'Weasley',
//   },{
//     first_name: 'Ernie',
//     last_name: 'MacMillan',
//   }, {
//     first_name: 'Percy',
//     last_name: 'Weasly',
//   }]);
//  });

//  const Courses = sequelize.define('courses', {
//     course_name: Sequelize.STRING
//    });
   
//    Courses.sync({force: true}).then(() => {
//    return Courses.bulkCreate([{
//     id: 3,
//     course_name: 'Flying',
//    },{
//     id: 4,
//     course_name: 'Charms',
//    }, {
//     id: 5,
//     course_name: 'Care of Magical Creatures',
//    },{
//     id: 6,
//     course_name: 'Transfiguration',
//    }, {
//     id: 7,
//     course_name: 'Potions',
//    },{
//     course_name: 'Defense Against the Dark Arts',
//    }]);
//    });

   const Enrollments = sequelize.define('enrollments', {
    student_id: Sequelize.INTEGER,
    course_id: Sequelize.INTEGER,
    letter_grade: Sequelize.STRING
   });
   
   Enrollments.sync({force: true}).then(() => {
   return Enrollments.bulkCreate([{
    id: 19,
    student_id: 3,
    course_id: 3,
    letter_grade: 'B+',
   },{
    id: 20,
    student_id: 2,
    course_id: 3,
    letter_grade: 'A',
   }, {
    id: 28,
    student_id: 1,
    course_id: 3,
    letter_grade: 'A',
   },{
    id: 29,
    student_id: 1,
    course_id: 4,
    letter_grade: 'B+',
   }, {
    id: 31,
    student_id: 3,
    course_id: 4,
    letter_grade: 'A',
   },{
    id: 32,
    student_id: 2,
    course_id: 4,
    letter_grade: null,
   },{
    id: 33,
    student_id: 1,
    course_id: 6,
    letter_grade: null,
   },{
    id: 34,
    student_id: 8,
    course_id: 6,
    letter_grade: null,
   },{
    id: 35,
    student_id: 12,
    course_id: 6,
    letter_grade: 'A',
   },{
    id: 36,
    student_id: 16,
    course_id: 6,
    letter_grade: null,
   },{
    id: 37,
    student_id: 14,
    course_id: 6,
    letter_grade: null,
   }]);
   });

app.get('/api/students', (req, res) => {
    Students.findAll()
    .then( students => res.status(200).json(students))
    .catch(err => res.send(err))
})

app.put('/api/students/:id', (req, res) => {
    const { first_name, last_name } = req.body;
    Students.update({
        first_name,
        last_name
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: "Student updated" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.post('/api/students', (req, res) => {
    const { first_name, last_name } = req.body;
    Students.create({
        first_name,
        last_name
    })
    .then(() => res.status(200).json({ message: "Student created" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.delete('/api/students/:id', (req, res) => {
    Students.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: "Student deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.get('/api/courses', (req, res) => {
    Courses.findAll()
    .then( courses => res.status(200).json( courses ))
    .catch(err => res.status(400).json({ error: err }))
})

app.put('/api/courses/:id', (req, res) => {
    const { course_name } = req.body;
    Courses.update({
        course_name
    }, {
    where: {
        id: req.params.id
    }
    })
    .then(() => res.status(200).json({ message: "Course updated" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.post('/api/courses', (req, res) => {
    const { course_name } = req.body;
    Courses.create({
        course_name
    })
    .then(() => res.status(200).json({ message: "Course created" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.delete('/api/courses/:id', (req, res) => {
    Courses.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: "Course deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.get('/api/enrollments', (req, res) => {
    Enrollments.findAll()
    .then( enrollments => res.status(200).json( enrollments ))
    .catch(err => res.status(400).json({ error: err }))
})

app.put('/api/enrollments/:id', (req, res) => {
    const { student_id, course_id, letter_grade } = req.body;
    Enrollments.update({
        student_id,
        course_id,
        letter_grade
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: "Enrollment updated" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.post('/api/enrollments', (req, res) => {
    const { student_id, course_id, letter_grade } = req.body;
    Enrollments.create({
        student_id,
        course_id,
        letter_grade
    })
    .then(() => res.status(200).json({ message: "Enrollment created" }))
    .catch(err => res.status(400).json({ error: err }))
})

app.delete('/api/enrollments/:id', (req, res) => {
    Enrollments.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: "Enrollment deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})




const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))
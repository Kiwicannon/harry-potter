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

const Students = sequelize.define('students', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
 });
 
 const Courses = sequelize.define('courses', {
    course_name: Sequelize.STRING
 });
 
 const Enrollments = sequelize.define('enrollments', {
    student_id: Sequelize.INTEGER,
    course_id: Sequelize.INTEGER,
    letter_grade: Sequelize.STRING
 });

  
app.get('/api/students', (req, res) => {
    Students.findAll()
    .then( students => res.status(200).json(students))
    .catch(err => res.status(400).json({ error: err }))
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
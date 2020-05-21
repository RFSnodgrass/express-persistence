var express = require('express');
var path = require('path');
const bodyParser = require("body-parser")
const db = require('./queries')

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/student', db.getStudents)
app.get('/students/:studentId', db.getStudent);
app.get('/grades/:studentId', db.getGrades);
app.post('/grade', db.postStudentGrade);
app.post('/register', db.postStudentReg);

module.exports = app;

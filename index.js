const express = require('express');
const app = express()
const Student = require('./models/student') //Schema for Student Data

const data = [
    { 
        Name:"Ajinkya", 
        Age: 25, 
        Marks:80 
    }, 
    { 
        Name:"Krishna", 
        Age:23, 
        Marks:90 
    }, 
    { 
        Name:"Ananta", 
        Age:28, 
        Marks:100 
    }, 
    { 
        Name:"Pruthvi", 
        Age:24, 
        Marks:120 
    }
] 
/* saving data to mongodb */
data.forEach(async (d) => {
    const student = new Student(d);
    student.save().then(() => console.log('Student data saved')) //saving each individual student data to mongodb
})

/* sortinfg the data in ascending order*/
app.get("/sort", async (_req, res) => {
    const students = await Student.find({}) //Get every student data from database
    const sortedStudentAge = students.sort((a,b) => a.Age - b.Age) //Sorting the data in ascending order
    res.json(sortedStudentAge);
})

/* Finding sum of marks */
app.get("/sum", async (_req, res) => {
    const students = await Student.find({})
    const total = students.reduce((sum, s) => sum + s.Marks,0) //Calculating the summ
    res.send(`Sum of marks by students is ${total}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
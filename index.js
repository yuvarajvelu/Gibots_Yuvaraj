const express = require('express');
const app = express()
const Student = require('./models/student')

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

data.forEach(async (d) => {
    await Student.deleteMany()
    const student = new Student(d);
    student.save().then(() => console.log('Student data saved'))
})

app.get("/",async (req,res) => {
    const students = await Student.find({})
    res.json(students)
})

app.get("/sort", async (req, res) => {
    const students = await Student.find({})
    const sortedStudentAge = students.sort((a,b) => a.Age - b.Age)
    res.json(sortedStudentAge);
})

app.get("/sum", async (req, res) => {
    const students = await Student.find({})
    const total = students.reduce((sum, s) => sum + s.Marks,0)
    res.send(`Sum of marks by students is ${total}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
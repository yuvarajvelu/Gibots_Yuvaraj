const mongoose = require('mongoose')

mongoose
    .connect(`mongodb+srv://fullstack:<password>@cluster0.ukmjg.mongodb.net/gibotprob?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true,  })
    .then(result =>  console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB:', error.message))


const studentSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Marks: Number
})

studentSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Student",studentSchema)
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please enter password for database')
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  'mongodb+srv://Admin4413:' + password +'@fsopenp3.ap9qj.mongodb.net/phonebook-app?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

const person = new Person({
  name: name,
  number: number,
})

person.save().then(result => {
  console.log('Added ' + name + " number: " + number + " added to phonebook" )
  mongoose.connection.close()
})

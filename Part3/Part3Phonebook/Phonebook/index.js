require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('body', function (req, res){return JSON.stringify(req.body)})
app.use(morgan('tiny'))
app.use(morgan(':body'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get('/api/persons', (request, response) => {
  Person
  .find({})
  .then(result => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
  Person
  .find({})
  .then(result => {
    response.send('<h1>Phonebook has info for ' + result.length + ' people </h1></br><h2>' + Date() + '</h2>')
  })

})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      } else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id, function (err){
    if(err) console.log(err)
  })
  response.status(204).end()
})

app.put('/api/persons/:id', (request,response) => {
  Person.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true}, (err) => {
    if(err) console.log(err)
  })
})

app.post('/api/persons', (request,response,next) => {
    const body = request.body
    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () =>{
  console.log('Server running on port' + PORT)
})

const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.password || !body.username){
    response.status(400).json({
      error: 'user or pass missing'
    }).end()
  }

  if(body.password.length < 3){
    response.status(400).json({
      error: 'password must be longer than three characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request,response) => {
  user = await User.findById(request.params.id)
  response.json(user)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
module.exports = usersRouter

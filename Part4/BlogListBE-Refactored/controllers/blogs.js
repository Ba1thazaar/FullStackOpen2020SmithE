
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if(!user){
    return response.status(401).json({error: 'bad authorization'})
  }
  var likes = 0;
  if(body.likes){
    likes = body.likes
  }

  if(!body.title && !body.url){
    response.status(400).end()
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if(!blog){
    return response.status(401).json({error: 'bad id'})
  }

  if(blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request,response) => {

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(newBlog.toJSON)
})

module.exports = blogsRouter

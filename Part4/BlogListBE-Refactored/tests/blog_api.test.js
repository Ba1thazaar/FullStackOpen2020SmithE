const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const Blog = require('../models/blog')
const User = require('../models/user')

var token = 0;

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})


  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  }

  await api
    .post('/api/users')
    .send(newUser)

  await api
    .post('/api/login')
    .send({
      username: newUser.username,
      password: newUser.password,
    })
    .then(response => {
      token = response.body.token
    })

  blogs = helper.initialBlogs

  for(const blog of blogs){
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(200)
  }

})

describe('blog tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').set('Authorization', 'Bearer ' + token)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs have id verifier', async () => {
    const response = await api.get('/api/blogs').set('Authorization', 'Bearer ' + token)

    response.body.forEach(blog => expect(blog.id.toBeDefined))

  })

  test('a valid blog can be added', async () => {

    const newBlog = {
      title: "Never Gonna Give",
      author: "Emmett Smith",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  })

  test('no likes defaults to 0', async () => {
    const newBlog = {
      title: "Never Gonna Give",
      author: "Emmett Smith",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)

  })

  test('title and url not present', async () => {
      const newBlog = {
        author: "Emmett Smith",
      }
      await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(400)
  })

  test('authorization not present', async () => {
    const newBlog = {
      title: "Never Gonna Give",
      author: "Emmett Smith",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const newUser = {
      username: 'root',
      name: 'SuperCoolGuy',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

  })

  test('create user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('failure on missing password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Oonga boonga',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('user or pass missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('failure on missing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('user or pass missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('shorter usernames and passwords are not accepted', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '1e',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be longer than three characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const getBlogs = () => {
    blogService.getAll()
      .then(initialBlogs => {
        const orderedBlogs = initialBlogs.sort((a,b) => {
          return a.likes - b.likes
        })
        setBlogs(orderedBlogs.reverse())
      })
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try{
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setMessage('Successfully logged in!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const addBlog = async (blogObject) => {
    try{
      await blogService.create(blogObject)
      setMessage('Blog: ' + blogObject.title + ' has been successfully added.')
      getBlogs()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error){
      setMessage(error.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if(window.confirm('Do you want to delete: ' + blog.title + '?')){

      try {
        await blogService.remove(blog.id)
        setMessage(blog.title + ' has been deleted')
        getBlogs()
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (error) {
        setMessage(error.message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }

  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setMessage('Logged Out')
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  const handleLike = async (blogObject) => {
    try{
      await blogService.update(blogObject)
      getBlogs()
    } catch (error){
      setMessage(error.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel = "New Blog">
      <BlogForm createBlog = {addBlog}/>
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel = "Login">
      <LoginForm handleLogin = {handleLogin}/>
    </Togglable>
  )

  const blogDisplay = () => (
    <div>
      <div>
        <p>{user.name} logged-in</p>
      </div>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike ={handleLike} handleDelete={handleDelete} user={user} />
        )}
      </div>
      <form onSubmit = {handleLogout}>
        <button id="logout-button" type = "submit">logout</button>
      </form>
      {blogForm()}
    </div>
  )


  return (
    <div>
      <Notification message = {message}/>
      {
        user === null ?
          loginForm() :
          blogDisplay()
      }
    </div>
  )
}

export default App

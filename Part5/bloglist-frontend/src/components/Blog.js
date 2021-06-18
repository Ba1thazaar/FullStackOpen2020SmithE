import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const [displayAll, setDisplayAll] = useState(false)

  const toggleDisplay = () => {
    setDisplayAll(!displayAll)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    handleDelete(blog)
  }

  const addLike = async (event) => {
    event.preventDefault()
    console.log(blog)
    const newData = ({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })

    handleLike(newData)
  }

  const displayDelete = () => (
    <button id="delete-button" onClick={deleteBlog}>
      Remove
    </button>
  )
  const expandedDisplay = () => (
    <div>
      <p>{blog.title}</p>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <button id="like-button" onClick = {addLike}>
        Like
      </button>
      <p>Author: {blog.author}</p>
      {
        blog.user.username === user.username ?
          displayDelete() : console.log('')
      }
      <button onClick={toggleDisplay}>
        Hide
      </button>
    </div>
  )

  const defaultDisplay = () => (
    <div className='defaultBlogDisplay'>
      <p>{blog.title}: {blog.author}</p>
      <button id="view-button" onClick={toggleDisplay}>
        View
      </button>
    </div>
  )


  return (
    <div style = {blogStyle}>
      {
        displayAll ?
          expandedDisplay() :
          defaultDisplay()
      }
    </div>
  )
}

export default Blog


const dummy = (blogs) => {
  return(
    1
  )
}

const totalLikes = (blogs) => {
  var total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  var topBlog = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return topBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

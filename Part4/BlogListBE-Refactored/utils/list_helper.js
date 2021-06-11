
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

const findMostUsed = (arr) => {
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

const mostBlogs = (blogs) => {
  const authorsAppear = blogs.map(blog => blog.author)
  return findMostUsed(authorsAppear)
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

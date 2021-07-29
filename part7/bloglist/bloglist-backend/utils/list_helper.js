const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((acc, curr) => acc.likes > curr.likes ? acc : curr)

const mostBlogs = (blogs) => {
  let blogsByAuthor = {}
  blogs.filter((blog) => blogsByAuthor[blog.author] ? blogsByAuthor[blog.author] += 1 : blogsByAuthor[blog.author] = 1)
    
  let mostBlog = Object.entries(blogsByAuthor).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr)
  return {
    author: mostBlog[0],
    blogs: mostBlog[1]
  }
}

const mostLikes = (blogs) => {
  let blogsByAuthor = {}
  blogs.filter((blog) => blogsByAuthor[blog.author] ? blogsByAuthor[blog.author] += blog.likes : blogsByAuthor[blog.author] = blog.likes)
  
  let mostBlog = Object.entries(blogsByAuthor).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr)
  return {
    author: mostBlog[0],
    likes: mostBlog[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
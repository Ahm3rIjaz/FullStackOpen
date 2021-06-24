import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, removeBlog, user, incLikes}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const showWhenVisible = { display: isDetailsVisible ? '' : 'none' }

  const incrementLike = async () => {
    try {
      const response = await blogService.incrementLike({ ...blog, likes: blog.likes + 1 })
      incLikes({...blog, likes: blog.likes + 1})
    } catch (error) {
      console.log(error)
    }
  }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>{isDetailsVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={incrementLike}>like</button><br/>
        {blog.author}<br/>
        {blog.user.username === user.username ? (<button onClick={remove}>delete</button>) : null}
      </div>
    </div>
  )
}

export default Blog
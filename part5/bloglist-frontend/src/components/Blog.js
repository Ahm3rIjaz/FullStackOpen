import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, user, incrementLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const showWhenVisible = { display: isDetailsVisible ? '' : 'none' }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      removeBlog(blog.id)
    }
  }

  return (
    <div id="blog" style={blogStyle}>
      <div>
        <span>{blog.title}</span> <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>{isDetailsVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        {blog.url}<br/>
        likes {blog.likes} <button onClick={() => incrementLike(blog)} >like</button><br/>
        {blog.author}<br/>
        {blog.user.username === user.username ? (<button onClick={remove}>delete</button>) : null}
      </div>
    </div>
  )
}

export default Blog
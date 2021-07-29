import React from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      {
        blogs.sort((a, b) => b.likes - a.likes).map((blog, i) => (
          <div key={i} id='blog' style={blogStyle}>
            <div>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>

            </div>
          </div>
        ))
      }
    </div>
  )
}

export default BlogList
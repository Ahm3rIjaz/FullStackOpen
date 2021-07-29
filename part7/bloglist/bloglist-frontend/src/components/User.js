import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    !user
      ? 'user not found'
      : (
        <div>
          <h2>{user.name}</h2>
          <h5>Added blogs</h5>
          <ul>
            {blogs.map((blog, i) =>
              blog.user.id === user.id
                ? (
                  <li key={i}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </li>
                )
                : ''
            )}
          </ul>
        </div>
      )
  )
}

export default User
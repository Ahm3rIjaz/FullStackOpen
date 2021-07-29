import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incLike, deleteBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks/index'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()

  const [comment, resetComment] = useField('text')

  const incrementLike = () => {
    dispatch(incLike(blog))
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const createComment = () => {
    dispatch(addComment(blog.id, comment.value))
    resetComment()
  }

  return (
    !blog
      ? 'blog not found'
      : (
        <div>
          <h2>{blog.title}</h2><br/>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} likes <button onClick={incrementLike} >like</button><br/>
          added by {blog.user.username}<br/>
          {
            blog.user.username === user.username
              ? (<button onClick={removeBlog}>delete</button>)
              : null
          }
          <h4>comments</h4>
          <input {...comment} /> <button onClick={createComment}>add comment</button>
          <ul>
            {
              blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
            }
          </ul>
        </div>
      )
  )
}

export default Blog
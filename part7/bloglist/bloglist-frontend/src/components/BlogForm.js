import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [newTitle, resetNewTitle] = useField('text')
  const [newAuthor, resetNewAuthor] = useField('text')
  const [newUrl, resetNewUrl] = useField('text')

  const resetForm = () => {
    resetNewTitle()
    resetNewAuthor()
    resetNewUrl()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
    }
    dispatch(createBlog(newBlog, user))
    resetForm()
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        title <input {...newTitle} /><br/>
        author <input {...newAuthor} /><br/>
        url <input {...newUrl} />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
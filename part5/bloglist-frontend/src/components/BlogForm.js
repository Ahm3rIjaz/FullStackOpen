import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      await createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      console.log(error)
    }
    // try {
    //   await blogService.create(newBlog)
    //   setBlogs(blogs.concat(newBlog))
    //   setNewTitle('')
    //   setNewAuthor('')
    //   setNewUrl('')
    //   setSuccessMessage('Blog added successfully')
    //   setTimeout(() => {
    //     setSuccessMessage(null)
    //   }, 5000)
    // } catch (error) {
    //   setErrorMessage(error.response.data['error'])
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
    // }
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        title <input id='title' value={newTitle} name='Title' onChange={({ target }) => setNewTitle(target.value)} /><br/>
        author <input id='author' value={newAuthor} name='Author' onChange={({ target }) => setNewAuthor(target.value)} /><br/>
        url <input id='url' value={newUrl} name='Url' onChange={({ target }) => setNewUrl(target.value)} /><br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
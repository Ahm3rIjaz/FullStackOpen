import { useState } from 'react'

const BlogForm = ({createBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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
        title <input value={newTitle} name='Title' onChange={({target}) => setNewTitle(target.value)} /><br/>
        author <input value={newAuthor} name='Author' onChange={({target}) => setNewAuthor(target.value)} /><br/>
        url <input value={newUrl} name='Url' onChange={({target}) => setNewUrl(target.value)} /><br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
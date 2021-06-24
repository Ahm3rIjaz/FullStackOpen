import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const Notification = ({message, classname}) => {
  if (!message) {
    return null
  }
  return (
    <div className={classname}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Logged in successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage('Blog added successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data['error'])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const incLikes = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
  }

  const removeBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setSuccessMessage('Logged Out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const loggedIn = () => {
    if (!user) {
      return (
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      )
    }
    return (
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} removeBlog={removeBlog} user={user} blog={blog} incLikes={incLikes} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {successMessage
      ? <Notification message={successMessage} classname="success" />
      : <Notification message={errorMessage} classname="error" />}
      <Notification message={errorMessage} />
      {loggedIn()}
    </div>
  )
}

export default App
import React from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loggedUserReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  const resetForm = () => {
    resetUsername()
    resetPassword()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      resetForm()
      dispatch(setUser(user))
      dispatch(setNotification('Logged in successfully', 'success', 5))
    } catch (error) {
      dispatch(setNotification('Wrong Credentials', 'error', 5))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        username <input {...username} /><br />
        password <input {...password} /><br />
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
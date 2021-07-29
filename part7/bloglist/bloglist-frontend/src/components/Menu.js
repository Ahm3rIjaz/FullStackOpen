import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { clearUser } from '../reducers/loggedUserReducer'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  const user = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    dispatch(setNotification('Logged out successfully', 'success', 5))
  }

  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {
        user
          ? <span>{user.username} logged in <button onClick={handleLogout}>logout</button></span>
          : ''
      }
    </div>
  )
}

export default Menu
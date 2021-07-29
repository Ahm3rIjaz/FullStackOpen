import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router'
import blogService from './services/blogs'
import './index.css'
import Menu from './components/Menu'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UsersList from './components/UsersList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loggedUserReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)


  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Menu />
      <h2>blog app</h2>
      <Notification />
      <Login />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={blog} />
        </Route>
        <Route path="/blogs">
          <BlogList />
        </Route>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
        <Route path='/users'>
          <UsersList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
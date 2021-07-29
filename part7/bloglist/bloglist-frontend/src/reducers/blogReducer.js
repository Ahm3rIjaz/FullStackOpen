import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'NEW_BLOG':
      return state.concat(action.newBlog)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    case 'INCREMENT_LIKE':
      return state.map(blog => blog.id !== action.response.id ? blog : action.response )
    case 'ADD_COMMENT':
      return state.map(blog => blog.id !== action.updatedBlog.id ? blog : action.updatedBlog )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    try {
      const response = await blogService.create(blog)
      console.log('createBlog: ', response, user)
      dispatch({
        type: 'NEW_BLOG',
        newBlog: {
          ...blog,
          likes: response.likes,
          id: response.id,
          user: { username: user.username, id: response.user }
        }
      })
      dispatch(setNotification('Blog added successfully', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      const response = await blogService.remove(id)
      console.log('removeBlog: ', response)
      dispatch({
        type: 'DELETE_BLOG',
        id
      })
      dispatch(setNotification('Blog deleted successfully', 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const incLike = (blog) => {
  return async dispatch => {
    try {
      const response = await blogService.incrementLike({ ...blog, likes: blog.likes + 1 })
      console.log('incLike: ', response)
      dispatch({
        type: 'INCREMENT_LIKE',
        response
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      console.log('comment added: ', updatedBlog)
      dispatch({
        type: 'ADD_COMMENT',
        updatedBlog
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export default blogReducer
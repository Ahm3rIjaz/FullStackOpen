const notificationReducer = (state = { message: '', msgType: '' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.notification, msgType: action.msgType }
    case 'CLEAR_NOTIFICATION':
      return { message: '', msgType: '' }
    default:
      return state
  }
}

let timeout

export const setNotification = (notification, msgType, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
      msgType
    })
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(clearNotification()), duration * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
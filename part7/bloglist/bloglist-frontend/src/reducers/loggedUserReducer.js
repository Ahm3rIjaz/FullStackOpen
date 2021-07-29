const loggedUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'CLEAR_USER':
      return ''
    default:
      return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const clearUser = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_USER',
    })
  }
}

export default loggedUserReducer
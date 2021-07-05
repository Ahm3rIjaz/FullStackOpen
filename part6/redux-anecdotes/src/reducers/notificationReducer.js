const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return `you liked '${action.anecdote}'`
    default:
      return state
  }
}

export const likedAnecdote = (anecdote) => {
  return {
    type: 'SET_NOTIFICATION',
    anecdote
  }
}

export default notificationReducer
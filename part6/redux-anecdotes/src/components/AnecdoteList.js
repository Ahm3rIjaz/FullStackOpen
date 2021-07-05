import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { likedAnecdote } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  })
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteOf(anecdote.id))
    dispatch(likedAnecdote(anecdote.content))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
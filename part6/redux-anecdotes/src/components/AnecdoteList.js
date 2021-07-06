import React from 'react'
import { connect } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const orderedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)
  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.voteOf(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    orderedAnecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(state.filter)
    )}
}

const mapDispatchToProps = {
  voteOf,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)
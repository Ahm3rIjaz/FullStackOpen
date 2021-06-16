import React, { useState } from 'react'

const Anecdote = ({anecdote, votes}) => {
  return (
    <div>
      {anecdote}<br/>
      has {votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [votes, setVotes] = useState(new Array(7).fill(0));
  const [selected, setSelected] = useState(0);
  const [maxVotes, updateMaxVotes] = useState(0);

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    if (copy[selected] > copy[maxVotes]) {
      updateMaxVotes(selected);
    }
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleVotes}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 7))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[maxVotes]} votes={votes[maxVotes]} />
    </div>
  )
}

export default App
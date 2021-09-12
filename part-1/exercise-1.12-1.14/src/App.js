import React, { useState } from 'react'

const Button = ({onClick , text}) => {
  return(
    <>
    <button onClick={onClick}>{text}</button>
    </>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const handleSelectedClick = () => {

    setSelected(getRandomInt());
  }
  const array = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  
  
  const handleVoteClick = (index) => () => {
    let newVote = [...votes];
    newVote[index] += 1;
    setVotes(newVote);
    
    
  }
  const [votes , setVotes] = useState([...array]);
  
    
  
  

  
  function getRandomInt() {
    let min = Math.ceil(0);
    let max = Math.floor(anecdotes.length-1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]}</div>
      <Button onClick={handleSelectedClick} text="next ancedote" />
      <Button onClick={handleVoteClick(selected)} text="vote" />

      <h1>Anecdotes with most views</h1>
      <div>{anecdotes[votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)]}</div>
    </div>
  )
}

export default App
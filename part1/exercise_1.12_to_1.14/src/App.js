import React, { useState } from 'react';

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  );
}

const Text = (props) => {
  return (
    <div>{props.text}</div>
  );
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  );
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
  ];

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * (anecdotes.length));
    setSelected(randomNumber);
  }
  const voteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const mostVotes = () => {
    let score = 0;
    let indice = 0;
    for(let i=0; i<votes.length; i++) {
      if(votes[i] > score) {
        score = votes[i];
        indice = i;
      }
    }
    return indice;
  }
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(10+1).join('0').split('').map(parseFloat));
  
  return (
    <div>
      <Header title={'Anecdote of the day'}/>
      <Text text={anecdotes[selected]}/>
      <Text text={'has '+votes[selected]+' votes'}/>
      <Button onClick={voteClick} name={'vote'}/>
      <Button onClick={handleClick} name={'next anecdote'}/>
      <Header title={'Anecdote with most votes'}/>
      <Text text={anecdotes[mostVotes()]}/>
      <Text text={'has '+votes[mostVotes()]+' votes'}/>
    </div>
  );
}

export default App;

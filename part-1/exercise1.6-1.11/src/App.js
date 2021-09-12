import React, { useState } from "react";


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Display = ({ click, clickUpdate }) => (
  <p>
    {click} : {clickUpdate}
  </p>
);
const Statistics = (props) => {
  return (
    <>
    <Display click="good" clickUpdate={props.good} />
      <Display click="neutral" clickUpdate={props.neutral} />
      <Display click="bad" clickUpdate={props.bad} />
    <Display click="total" clickUpdate={props.total} />
    <Display click="average" clickUpdate={props.average} />
    <Display click="positive" clickUpdate={props.positive} />

    </>
  )
}

const History = (props) => {
  if(props.total === 0){
    return (
      <>
      <p>no feeback given</p>
      </>
    )
  }
  return (
    <>
    <Statistics good={props.good} neutral={props.neutral} bad={props.bad} total={props.total} average={props.average} positive={props.positive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0); //useState is a function of hook for change state where 0 is the initial value of counter and setcounter changes the value of counter
  const [neutral, setNeutral] = useState(0); //useState is a function of hook for change state
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positive , setPositive] = useState(0); 
  const [average, setAverage] = useState(0); 
  
  const handleGoodClick = () => {
    
    setGood(good + 1);
    setTotal(total + 1);
    setPositive(((good/total)*100));
    setAverage(((good-bad)/total));
  };
  const handleNeutralClick = () => {
    
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setPositive(((good/total)*100));
    setAverage(((good-bad)/total));
  };
  const handleBadClick = () => {
    
    
    setBad(bad + 1);
    setTotal(total + 1);
    setPositive(((good/total)*100));
    setAverage(((good-bad)/total));
    
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      
      <History good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
      
      
    </div>
  );
};

export default App;

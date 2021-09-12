import React from "react";

const Header = (props) => {
  return <h1>{props.title}</h1>;
};
const Part1 = (props) => {
  return (
    <p>
      {props.part1} {props.exercise1}
    </p>
  );
};
const Part2 = (props) => {
  return (
    <p>
      {props.part2} {props.exercise2}
    </p>
  );
};
const Part3 = (props) => {
  return (
    <p>
      {props.part3} {props.exercise3}
    </p>
  );
};

const Content = (props) => {
  
  
  
  
  return (
    <>
      <Part1 part1={props.name1} exercise1={props.exercises1} />
      <Part2 part2={props.name2} exercise2={props.exercises2} />
      <Part3 part3={props.name3} exercise3={props.exercises3} />
    </>
  );
};
const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";

  
  const parts = [
    {
      name: "Fundamentals of React",
      exercises1: 10,
    },
    {
      name: "Using props to pass data",
      exercises2: 7,
    },
    {
      name: "State of a component",
      exercises3: 14,
    },
  ];

  return (
    <div>
      <Header title={course} />
      <Content name1={parts[0].name} name2={parts[1].name} name3={parts[2].name} exercise1={parts[0].exercises1} exercise2={parts[1].exercises2} exercise3={parts[2].exercises3} />
      <Total
        exercise1={parts[0].exercises1}
        exercise2={parts[1].exercises2}
        exercise3={parts[2].exercises3}
      />
    </div>
  );
};

export default App;

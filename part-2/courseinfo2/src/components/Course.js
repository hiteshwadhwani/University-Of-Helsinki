import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <div>
      {course.name} {course.exercises}
    </div>
  );
};

const Total = ({ course }) => {
  const total = course.reduce((prev, cur) => {
    return prev + cur.exercises;
  }, 0);
  return <strong>total of {total} exercises</strong>;
};


const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
  
        {course.parts.map((part, i) => (
          <Content key={i} course={part} />
        ))}
        <Total course={course.parts} />
      </>
    );
  };
export default Course;

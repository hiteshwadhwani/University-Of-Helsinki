import Course from './components/Course';

const App = ({ course}) => {
  

  return (
    <div>
      {course.map((part) => 
          <Course key={part.id} course={part} />
      )}
      
      
    </div>
  );
};

export default App;

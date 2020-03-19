import React from "react";
import ReactDOM from "react-dom";
import Header from './Header';
import Content from './Content';
import Total from './Total';
import { CoursePart } from './types';

const App: React.FC = () => {


  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Oneliners with Perl",
      description: "Learn how to make everything unreadable with Perl",
      difficulty: "Hard",
      exerciseCount: 75
    }
  ];
  
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
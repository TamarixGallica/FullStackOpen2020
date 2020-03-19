import React from 'react';
import { CoursePart } from './types';

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<PartProps> = ({part}) => {
    switch (part.name) {
        case "Fundamentals":
            return <p>
                {part.name} {part.exerciseCount} exercises<br />
                Description: {part.description}
                </p>;
        case "Using props to pass data":
            return <p>
                {part.name} {part.exerciseCount} exercises<br />
                Group project count: {part.groupProjectCount}
                </p>;
        case "Deeper type usage":
            return <p>
                {part.name} {part.exerciseCount} exercises<br />
                Description: {part.description}<br />
                <a href={part.exerciseSubmissionLink}>Exercise submission link</a>
                </p>;
        case "Oneliners with Perl":
            return <p>
                {part.name} {part.exerciseCount} exercises<br />
                Description: {part.description}<br />
                Difficulty: {part.difficulty}
                </p>;
        default:
            return assertNever(part);
    }
};


export default Part;

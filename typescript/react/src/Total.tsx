import React from 'react';
import { CoursePart } from './types';

interface TotalProps {
    parts: Array<CoursePart>;
}

const Total: React.FC<TotalProps> = ({parts}) => {
    const sum = parts.reduce((carry, part) => carry + part.exerciseCount, 0);
    return (
        <p>Number of exercises {sum}</p>
    );
};

export default Total;
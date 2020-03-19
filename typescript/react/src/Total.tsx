import React from 'react';
import { Part } from './types';

interface TotalProps {
    parts: Array<Part>;
}

const Total: React.FC<TotalProps> = ({parts}) => {
    const sum = parts.reduce((carry, part) => carry + part.exerciseCount, 0);
    return (
        <p>Number of exercises {sum}</p>
    );
};

export default Total;
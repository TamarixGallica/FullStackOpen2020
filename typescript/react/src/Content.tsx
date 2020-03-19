import React from 'react';
import { Part } from './types';

interface ContentProps {
    parts: Array<Part>;
}

const Content: React.FC<ContentProps> = ({parts}) => {
    return (
        <div>
            {parts.map((part, index) => <p key={index}>{part.name} {part.exerciseCount}</p>)}
        </div>
    );
};

export default Content;

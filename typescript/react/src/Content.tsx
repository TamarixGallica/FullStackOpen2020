import React from 'react';
import { CoursePart } from './types';
import Part from './Part';

interface ContentProps {
    parts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({parts}) => {
    return (
        <div>
            {parts.map((part, index) => <Part key={index} part={part} />)}
        </div>
    );
};

export default Content;

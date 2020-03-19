import React from 'react';

interface HeaderProps {
    name: string;
}

const Header: React.FC<HeaderProps> = ({name}) => {
    return (
        <h2>{name}</h2>
    );
};


export default Header;

import React from 'react';
import { withRouter, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    let linkPath = '/slide';
    let linkText = 'Play Game';
    if (location.pathname.toLowerCase() === '/slide') {
        linkPath = '/home';
        linkText = 'Home';
    }

    return (
        <div className="header">
            <header className="app-title">
            Do the Slide
            </header>
            <NavLink to={linkPath}>{linkText}</NavLink>
        </div>
    );
}   

export default withRouter(Header);
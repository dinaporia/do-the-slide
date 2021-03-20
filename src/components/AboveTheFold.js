import React from 'react';
import { withRouter, NavLink, useLocation } from 'react-router-dom';

const AboveTheFold = () => {
    const location = useLocation();
    let linkPath = '/slide';
    let linkText = 'Go to game';
    if (location.pathname.toLowerCase() === '/slide') {
        linkPath = '/home';
        linkText = 'Home';
    }

    return (
        <div className="ATF">
            <header className="app-title">
            Do the Slide
            </header>
            <NavLink to={linkPath}>{linkText}</NavLink>
        </div>
    );
}   

export default withRouter(AboveTheFold);
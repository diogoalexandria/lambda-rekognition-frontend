import React from 'react';
import '../css/Nav.css';
import { Link } from 'react-router-dom';

export default function Nav() {
    const navStyle = {
        color: 'white'
    }

    return (
        <nav>
            <Link style={ navStyle } to="/">
                <h3>Logo</h3>
            </Link>
            <ul className="nav-links">
                <Link style={ navStyle } to="/register">
                    <li>Register</li>
                </Link>
                <Link style={ navStyle } to="recognition">
                    <li>Recognition</li>
                </Link>
            </ul>
        </nav>
    );
}

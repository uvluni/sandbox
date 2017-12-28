import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavBar.css';

const NavBar = () => {
    let name = localStorage.getItem('name');
    if (name) {
        name = name.replace(/"/g, '');
    }

    return (
        <div className={styles.container}>
            <Link className={styles.item} to="/">
                Home
            </Link>
            <Link className={styles.item} to="/about">
                About
            </Link>
            <Link className={styles.item} to="/locations">
                Locations
            </Link>
            {!name &&
                <Link className={styles.item} to="/login">
                    Login
                </Link>}
            {!name &&
                <Link className={styles.item} to="/signup">
                    Signup
                </Link>}
            {name &&
                <button
                    className={styles.logout}
                    onClick={event => {
                        localStorage.clear();
                    }}
                >
                    <Link className={styles.item} to="/">
                        Logout
                    </Link>
                </button>}
            <Link className={`${styles.item} ${styles.right}`} to="/">
                {name}
            </Link>
        </div>
    );
};
export default NavBar;

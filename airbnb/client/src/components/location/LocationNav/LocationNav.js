import React from 'react';

import styles from './LocationNav.css';

const LocationNav = () => {
    return (
        <ul className={styles.wrapper}>
            <li className={styles.nav}>
                <a href="#details"> Details </a>
            </li>
            <li className={styles.nav}>
                <a href="#amenities"> Amenities </a>
            </li>

            <li className={styles.nav}>
                <a href="#review-list"> Reviews </a>
            </li>

            <li className={styles.nav}>
                <a href="#map"> Map </a>
            </li>
        </ul>
    );
};

export default LocationNav;

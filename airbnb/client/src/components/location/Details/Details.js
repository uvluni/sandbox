import React from 'react';

import styles from './Details.css';

const Details = ({ generalDesc, guestAccess }) => {
    return (
        <div className={styles.details} id="details">
            <h2>Details</h2>
            <p>
                {generalDesc}
            </p>

            <p>
                {guestAccess}
            </p>
        </div>
    );
};

export default Details;

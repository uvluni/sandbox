import React from 'react';

import styles from './Jumbotron.css';

const Jumbotron = ({ imageUrl }) => {
    return (
        <div className={styles.jumbotron} style={{ background: `url(${imageUrl}) no-repeat center center fixed` }} />
    );
};

export default Jumbotron;

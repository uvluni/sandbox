import React from 'react';
import classnames from 'classnames';

import styles from './Rating.css';

export default function Rating({ value }) {
    const RATING_STAR = 5;
    let starsBar = [];
    value = Math.round(value);

    if (0 < value && value <= 5) {
        for (let i = 0; i < RATING_STAR; i++) {
            let classRating = classnames({ 'fa fa-star': value >= 1 }, { 'fa fa-star-o': value < 1 });
            starsBar.push(<i key={i} className={classRating} />);
            value--;
        }
    }

    return (
        <span className={styles.rating}>
            {starsBar}
        </span>
    );
}

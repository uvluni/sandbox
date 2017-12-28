import React from 'react';

import styles from './Review.css';

import Rating from '../Rating/Rating';

const Review = ({ review }) => {
    return (
        <div className={styles.review}>
            <div className={styles.user}>
                {review.userId &&
                    <div className={styles.portrait}>
                        <img
                            className={styles.avatar}
                            src={review.userId.imageUrl}
                            alt={review.title}
                        />
                    </div>}
                <div className={styles.name}>
                    {review.name}
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.content}>
                    <h4>
                        {review.title}
                    </h4>
                    {review.content}
                    <div className={styles.rating}>
                        <Rating value={review.rating} />
                    </div>
                </div>
                <div className={styles.date}>
                    {review.date}
                </div>
            </div>
        </div>
    );
};

export default Review;

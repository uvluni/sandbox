import React from 'react';

import styles from './ReviewList.css';

import Review from '../Review/Review';

const ReviewList = ({ reviews }) => {
    let reviewsArr = reviews.map((review, index) => <Review key={index} review={review} data-test={review.id} />);
    return (
        <div className={styles.main} id="review-list">
            <h2>Reviews</h2>
            {reviewsArr}
        </div>
    );
};

export default ReviewList;

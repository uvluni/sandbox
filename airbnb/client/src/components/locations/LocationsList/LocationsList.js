import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './LocationsList.css';

import Rating from '../../location/Rating/Rating';

export default class LocationsList extends Component {
    constructor(props) {
        super();
    }

    render() {
        let { locations } = this.props;

        let locationsArr = locations.map((location, index) => {
            let reviewsLength = location.reviews.length;
            let rating =
                location.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsLength;
            return (
                <Link to={`/locations/${location._id}`} key={location._id}>
                    <img src={location.imageUrl} alt={location.title} />
                    <div className={styles.locations_wrap}>
                        <h4>
                            {location.type} • {location.theSpace.beds} Beds
                        </h4>
                        <h3>
                            {location.title}, {location.address.city}
                        </h3>
                        <p className={styles.price}>
                            {location.price} {location.currency} Per Night
                        </p>
                        <span>
                            <Rating value={rating} /> {reviewsLength} reviews
                        </span>
                    </div>
                </Link>
            );
        });

        return (
            <div className={styles.locationsList}>
                {locationsArr}
            </div>
        );
    }
}

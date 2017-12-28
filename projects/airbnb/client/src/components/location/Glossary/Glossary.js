import React from 'react';

import styles from './Glossary.css';

import Rating from '../../location/Rating/Rating';

const Glossary = ({ glossary }) => {
    return (
        <div className={styles.main}>
            <div className={styles.details}>
                <h1>
                    {glossary.title}
                </h1>
                <div className={styles.description}>
                    <div className={styles.about}>
                        <span>
                            {glossary.type}
                        </span>
                        <span>
                            {glossary.city}
                        </span>
                        <span>
                            {glossary.reviewsCount} reviews
                        </span>
                        <span>
                            <Rating value={glossary.ratingAvg} />
                        </span>
                    </div>
                    <div className={styles.the_space}>
                        <span>
                            <i className="fa fa-users" /> {glossary.guests} guests
                        </span>
                        <span>
                            <i className="fa fa-cube" /> {glossary.bedrooms} bedrooms
                        </span>
                        <span>
                            <i className="fa fa-bed" /> {glossary.beds} beds
                        </span>
                    </div>
                </div>
            </div>
            {glossary.owner.imageUrl &&
                <div className={styles.owner}>
                    <div>
                        <img
                            className={styles.owner_img}
                            src={glossary.owner.imageUrl}
                            alt={glossary.owner.name.first}
                        />
                        <h4>
                            {glossary.owner.name.first}
                        </h4>
                    </div>
                </div>}
        </div>
    );
};

export default Glossary;

import React from 'react';
import classNames from 'classnames';

import styles from './Amenities.css';

const Amenities = ({ amenities }) => {
    let amenitiesArr = amenities.map((amenity, index) => {
        let icon = `icon fa fa-${amenity}`;
        return (
            <div key={index} className={classNames({ [styles.amenity]: true, [styles.group_amenity]: true })}>
                <div className={styles.group_description}>
                    <div className={icon} />
                    <div className={styles.description_text}>
                        {amenity.toUpperCase()}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={styles.group} id="amenities">
            {amenitiesArr}
        </div>
    );
};

export default Amenities;

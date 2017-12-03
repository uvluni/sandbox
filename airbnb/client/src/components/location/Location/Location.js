import React, { Component } from 'react';
import classNames from 'classnames';
import Sticky from 'react-sticky-el';

import styles from './Location.css';

import LocationNav from '../LocationNav/LocationNav';
import ReviewList from '../ReviewList/ReviewList';
import Jumbotron from '../Jumbotron/Jumbotron';
import Amenities from '../Amenities/Amenities';
import Glossary from '../Glossary/Glossary';
import Details from '../Details/Details';
import Book from '../Book/Book';
import Map from '../Map/Map';

class Location extends Component {
    constructor() {
        super();

        this.state = {
            location: {
                address: {},
                amenities: [],
                theSpace: {},
                reviews: [{}],
                userId: {}
            }
        };
        this.handleBook = this.handleBook.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await fetch(
                `http://localhost:9000/api/locations/${this.props.match.params.locationId}`
            );
            let json = await response.json();
            this.setState({ location: json });
        } catch (err) {
            console.log(err);
        }
    }

    handleBook(bookingDetails) {
        console.log(bookingDetails);
    }

    getLocationId() {
        return parseInt(this.props.match.params.locationId, 10);
    }

    render() {
        let {
            reviews,
            imageUrl,
            generalDesc,
            guestAccess,
            amenities,
            title,
            type,
            address,
            userId,
            theSpace
        } = this.state.location;

        let glossary = {
            title: title,
            type: type,
            city: address.city,
            reviewsCount: reviews.length,
            ratingAvg: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
            owner: userId,
            guests: theSpace.guests,
            bedrooms: theSpace.bedrooms,
            beds: theSpace.beds
        };

        return (
            <div>
                <Jumbotron imageUrl={imageUrl} />
                <div className={styles.main}>
                    <div
                        className={classNames({
                            [styles.details_container]: true,
                            [styles.content]: true
                        })}
                    >
                        <Sticky className={styles.sticky}>
                            <LocationNav />
                        </Sticky>

                        <Glossary glossary={glossary} />
                        <Details generalDesc={generalDesc} guestAccess={guestAccess} />
                        <Amenities amenities={amenities} />
                        <ReviewList reviews={reviews} />
                    </div>
                    <div
                        className={classNames({
                            [styles.book_container]: true,
                            [styles.content]: true
                        })}
                    >
                        <Sticky>
                            <Book onBook={this.handleBook} />
                        </Sticky>
                    </div>
                </div>
                <Map lat={address.lat} lng={address.lng} title={title} />
            </div>
        );
    }
}

export default Location;

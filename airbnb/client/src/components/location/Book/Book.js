import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import styles from './Book.css';

export default class Book extends Component {
    constructor() {
        super();
        this.state = {
            checkIn: '',
            checkOut: '',
            guests: ''
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }

    handleBook() {
        const { checkIn, checkOut, guests } = this.state;
        if (checkIn && checkOut && guests) {
            this.props.onBook(JSON.stringify(this.state));
            this.setState({
                checkIn: '',
                checkOut: '',
                guests: ''
            });
        } else {
            alert('Please fill all fields');
        }
    }

    handleFormChange(event, property) {
        this.setState({ [property]: event });
    }

    render() {
        let { checkIn, checkOut, guests } = this.state;

        return (
            <div className={styles.wrapper}>
                <h3 className={styles.header}> Book now </h3>
                <div className={styles.field_wrapper}>
                    <p>Check-In</p>
                    <DatePicker
                        selected={checkIn}
                        onChange={e => this.handleFormChange(e, 'checkIn')}
                        placeholderText="MM/DD/YYYY"
                        className={styles.field}
                    />
                </div>
                <div className={styles.field_wrapper}>
                    <p>Check-Out</p>
                    <DatePicker
                        selected={checkOut}
                        onChange={e => this.handleFormChange(e, 'checkOut')}
                        placeholderText="MM/DD/YYYY"
                        className={styles.field}
                    />
                    <span />
                </div>
                <div className={styles.field_wrapper}>
                    <p>Guests</p>
                    <input
                        value={guests}
                        onChange={e => this.handleFormChange(e.target.value, 'guests')}
                        className={styles.field}
                        name="guests"
                        type="number"
                        min="1"
                        max="5"
                        placeholder="1"
                    />
                </div>
                <div className={styles.field_wrapper}>
                    <button className="submit-btn" onClick={this.handleBook}>
                        Book
                    </button>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';

import './ReviewForm.css';

export default class ReviewForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            content: '',
            rating: ''
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleFormChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmitClick() {
        const { name, content, rating } = this.state;
        if (name && content && rating) {
            this.props.onSubmitReview(JSON.stringify(this.state));
            this.setState({
                name: '',
                content: '',
                rating: ''
            });
        } else {
            alert('Please fill all fields');
        }
    }

    render() {
        let { name, content, rating } = this.state;

        return (
            <div className="wrapper">
                <h3 className="header"> Post your review </h3>
                <input className="field" name="name" placeholder="Name" value={name} onChange={this.handleFormChange} />
                <input
                    className="field"
                    name="content"
                    placeholder="Review content"
                    value={content}
                    onChange={this.handleFormChange}
                />
                <input
                    className="field"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={this.handleFormChange}
                />

                <button className="submit-btn" onClick={this.handleSubmitClick}>
                    Submit
                </button>
            </div>
        );
    }
}

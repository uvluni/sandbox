import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import classNames from 'classnames';

// import styles from './Filter.css';

export default class LocationsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    updateList(event) {
        const { listData, onFilter } = this.props;
        let value = event.target.value;
        this.setState({ value });
        console.log(listData);

        let filteredList = listData.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );

        onFilter(filteredList);
    }

    render() {
        return (
            <div>
                <p>Title</p>
                <input type="text" value={this.state.value} onChange={e => this.updateList(e)} />
            </div>
        );
    }
}

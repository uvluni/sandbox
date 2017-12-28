import React, { Component } from 'react';

import LocationsList from '../LocationsList/LocationsList';
import Filter from '../Filter/Filter';

export default class Locations extends Component {
    constructor() {
        super();
        this.state = {
            originalLocations: [],
            displayedLocations: []
        };
    }

    componentWillMount() {
        (async () => {
            try {
                let response = await fetch('http://localhost:9000/api/locations');
                let json = await response.json();
                this.setState({ originalLocations: json, displayedLocations: json });
            } catch (err) {
                console.log(err);
            }
        })();
    }

    updateListState(displayedLocations) {
        this.setState({
            displayedLocations
        });
    }

    render() {
        let { originalLocations, displayedLocations } = this.state;
        return (
            <div>
                <Filter listData={originalLocations} onFilter={fl => this.updateListState(fl)} />
                <LocationsList locations={displayedLocations} />
            </div>
        );
    }
}

/*global google*/
import React, { Component } from 'react';

import styles from './Map.css';

export default class Map extends Component {
    constructor(props) {
        super();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        let lat = parseFloat(nextProps.lat);
        let lng = parseFloat(nextProps.lng);

        this.map.setCenter({ lat, lng });

        let latLang = new google.maps.LatLng(lat, lng);

        this.marker = new google.maps.Marker({
            position: latLang,
            map: this.map,
            title: nextProps.title
        });

        this.marker.setMap(this.map);
    }

    componentDidMount() {
        this.map = new google.maps.Map(this.$map, {
            center: { lat: this.props.lat, lng: this.props.lng },

            zoom: 14
        });
    }

    render() {
        return (
            <div
                className={styles.map}
                id="map"
                ref={el => {
                    this.$map = el;
                }}
            />
        );
    }
}

import React from 'react';
import { shallow, configure } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

import Amenities from './Amenities';

import styles from './Amenities.css';

configure({ adapter: new Adapter() });

describe('<Amenities />', () => {
    it('renders without crashing', () => {
        const amenitiesArr = ['first', 'second', 'third'];
        const amenities = shallow(<Amenities amenities={amenitiesArr} />);
        expect(amenities.find('.amenity-group').length).toEqual(1);
    });

    it('renders as many amenities as given', () => {
        const amenitiesArr = ['first', 'second', 'third'];
        const amenities = shallow(<Amenities amenities={amenitiesArr} />);
        expect(amenities.find('Amenity').length).toEqual(amenitiesArr.length);
    });
});

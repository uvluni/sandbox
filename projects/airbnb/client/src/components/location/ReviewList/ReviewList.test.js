import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ReviewList from './ReviewList';

configure({ adapter: new Adapter() });

const reviews = [
    {
        id: 1,
        title: 'Nice clean room',
        name: 'Lea',
        content: 'consequat nulla nisl nunc nisl duis bibendum venenatis turpis enim blandit mi in',
        userImageUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/h1brd/128.jpg',
        rating: 3,
        date: 'DECEMBER 4 2017'
    }
];

describe('<ReviewList />', () => {
    it('renders without crashing', () => {
        const reviewList = shallow(<ReviewList reviews={reviews} />);
        expect(reviewList.find('#review-list').length).toEqual(1);
    });

    it('should creat review elements', () => {
        const reviewList = shallow(<ReviewList reviews={reviews} />);
        expect(reviewList.find('Review').prop('data-test')).toEqual(reviews[0].id);
    });
});

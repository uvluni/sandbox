const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    title: String,
    type: String,
    generalDesc: String,
    guestAccess: String,
    price: Number,
    currency: String,
    amenities: [
        {
            type: String
        }
    ],
    imageUrl: {
        type: String
    },
    address: {
        country: String,
        city: String,
        street: String,
        number: Number,
        lat: Number,
        lng: Number
    },
    theSpace: {
        description: String,
        guests: Number,
        beds: Number,
        bedrooms: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'review'
        }
    ],
    occupancy: {
        type: String
    }
});

const location = mongoose.model('location', LocationSchema);

module.exports = location;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  id: Number,
  title: String,
  imageUrl: String,
  movieId: String
});

const location = mongoose.model('location', LocationSchema);

module.exports = location;

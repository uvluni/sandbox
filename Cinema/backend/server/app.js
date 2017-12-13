const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cinema', { useMongoClient: true });

// Initialize Application
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/locations', require('./routes/api/locations'));

module.exports = app;

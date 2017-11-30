const express = require('express');
const router = express.Router();
const LocationsController = require('../../controllers/locations');

router
    .route('/')
    .get(LocationsController.getLocations)
    .post(LocationsController.addLocation)
    .put(() => {})
    .delete(() => {});

router
    .route('/:locationId')
    .get(LocationsController.getLocation)
    .post(() => {})
    .put(() => {})
    .delete(() => {});

module.exports = router;

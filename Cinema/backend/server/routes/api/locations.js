const express = require('express');
const router = express.Router();
const LocationsController = require('../../controllers/locations');

router
  .route('/')
  .get(LocationsController.getLocations)
  .post(LocationsController.addLocation);

module.exports = router;

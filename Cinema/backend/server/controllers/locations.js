const Locations = require('../models/locations');

module.exports = {
  getLocations: async (req, res) => {
    try {
      const locations = await Locations.find();
      res.status(200).json(locations);
    } catch (error) {
      res.send(error);
    }
  },

  addLocation: async (req, res) => {
    const newLocation = new Locations(req.body);
    try {
      const location = await newLocation.save();
      res.status(200).json({ location, message: 'Created successfully' });
    } catch (error) {
      res.send(error);
    }
  }
};

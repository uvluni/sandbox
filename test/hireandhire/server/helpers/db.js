const { MONGO_URL, MONGO_URL_TEST } = require('./constants.js');

const db = () => {
  if (process.env.NODE_ENV === 'test') {
    return MONGO_URL_TEST;
  } else {
    return MONGO_URL;
  }
};

module.exports = db();

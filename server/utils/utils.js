var moment = require('moment');
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt : moment().valueOf()
  };
};
var generateLocation = (from, lat, lon) => {
  return {
    from,
    mapURL : `https://www.google.com/maps?q=${lat},${lon}`,
    createdAt : moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocation};

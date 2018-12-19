var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt : new Date().getTime()
  };
};
var generateLocation = (from, lat, lon) => {
  return {
    from,
    mapURL : `https://www.google.com/maps?q=${lat},${lon}`,
    createdAt : new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocation};

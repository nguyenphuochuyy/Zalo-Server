const { v4: uuidv4 } = require('uuid');

module.exports = function generateUUID() {
  return uuidv4();
};

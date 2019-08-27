const path = require('path');
const resolve = (p = '', root = '../') => {
  return path.resolve(__dirname, root, p);
};

module.exports = {
  resolve,
};

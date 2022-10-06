const path = require('path');

const PROD = 'production';
const DEV = 'development';
const mode = process.env?.NODE_ENV?.toLowerCase() === 'prod' ? PROD : DEV;

module.exports = {
  mode,
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
};

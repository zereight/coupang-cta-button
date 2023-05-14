const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PROD = 'production';
const DEV = 'development';
const mode = process.env?.NODE_ENV?.toLowerCase() === 'prod' ? PROD : DEV;
const isDevMode = mode === DEV;

const buildPath = path.resolve(__dirname, 'build');

const plugins = [
  new CopyPlugin({
    patterns: [{ from: path.join(__dirname, 'src/config'), to: './' }],
  }),
  new MiniCssExtractPlugin({ filename: 'style.css' }),
];

module.exports = {
  ...(isDevMode && { devtool: 'source-map' }),
  mode,
  plugins,
  entry: ['./src/js/index.js', './src/style/index.scss', './src/config/index.xml'],
  output: {
    path: buildPath,
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};

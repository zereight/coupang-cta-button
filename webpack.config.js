const path = require('path');

const PROD = 'production';
const DEV = 'development';
const mode = process.env?.NODE_ENV?.toLowerCase() === 'prod' ? PROD : DEV;

module.exports = {
  mode,
  entry: ['./src/js/index.js', './src/style/index.scss'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
  ],
};

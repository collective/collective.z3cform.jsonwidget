// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = './src/collective/z3cform/jsonwidget/browser/static';

module.exports = {
  entry: {
    jsonwidget: [
      path.resolve(__dirname, basePath, 'js/index.js'),
      // path.resolve(__dirname, basePath, 'sass/jsonwidget.scss'),
    ],
  },
  output: {
    path: path.resolve(__dirname, basePath, 'dist'),
    // ✅ NOME DEL FILE SEMPRE .min.js
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // Assicurati che ci sia @babel/preset-env
              '@babel/preset-env',
              // Modifica preset-react per usare la modalità classica
              ['@babel/preset-react', { runtime: 'classic' }],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // ✅ NOME DEL FILE SEMPRE .min.css
      filename: '[name].min.css',
    }),
  ],
  externals: {
    jquery: 'jQuery',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/client': 'ReactDOM',
  },
  devtool: 'source-map',
};

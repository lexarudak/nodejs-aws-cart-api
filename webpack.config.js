const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^@nestjs\/websockets$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@nestjs\/microservices$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@grpc\/grpc-js$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@grpc\/proto-loader$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^kafkajs$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^mqtt$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^nats$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^ioredis$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^amqplib$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^amqp-connection-manager$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@nestjs\/platform-socket.io$/,
    }),
  ],
  optimization: {
    minimize: false, // Отключаем минификацию
  },
};

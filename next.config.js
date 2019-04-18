const withTypescript = require('@zeit/next-typescript');
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const path = require('path');

module.exports = withPlugins(
  [
    nextEnv(),

    // another plugin with a configuration
    [withTypescript],
  ],
  {
    webpack: (config) => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              include: /node_modules\/final-form-material-ui/,
              test: /\.tsx?$/,
              loader: 'next-babel-loader',
            },
            {
              include: /node_modules\/final-form-material-ui/,
              test: /\.tsx?$/,
              loader: 'ts-loader',
              options: { allowTsInNodeModules: true, transpileOnly: true },
            },
          ],
        },
      };
    },
  },
);

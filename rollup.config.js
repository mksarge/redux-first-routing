import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const config = {
  format: 'umd',
  moduleName: 'ReduxFirstRouting',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: [
    'history/createBrowserHistory',
    'query-string',
  ],
  globals: {
    'history/createBrowserHistory': 'CreateBrowserHistory',
    'query-string': 'QueryString',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        ie8: false,
      },
      mangle: {
        ie8: false,
      },
      output: {
        ie8: false,
      },
    }));
}

export default config;

import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const prod = process.env.NODE_ENV === 'production';

const config = {
  output: {
    format: 'umd',
  },
  name: 'ReduxFirstRouting',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    ...prod ? [uglify()] : [],
  ],
};

export default config;

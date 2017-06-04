import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const prod = process.env.NODE_ENV === 'production';

const config = {
  format: 'umd',
  moduleName: 'ReduxFirstRouting',
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    ...prod ? [uglify()] : [],
  ],
};

export default config;

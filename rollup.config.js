import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pegjs from './src/rollup/pegjs';
import R from 'ramda';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  plugins: [
    nodeResolve({
      jsnext: true,
    }),
    commonjs({
      include: [
        'node_modules/**',
        'src/generated-parsers/**',
      ],
    }),
    babel({
      exclude: [
        'node_modules/**',
        'src/grammars/*.pegjs',
        'src/generated-parsers/**',
      ],
    }),
    pegjs({
      optimize: 'speed',
    }),
  ]
};

import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pegjs from './src/rollup/pegjs';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  plugins: [
    nodeResolve(),
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
    pegjs(),
  ]
};

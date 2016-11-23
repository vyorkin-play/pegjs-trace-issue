import { generate } from 'pegjs';
import { createFilter } from 'rollup-pluginutils';
import plugin1 from '../plugins/plugin1';
import R from 'ramda';

const dependencies = `
  import R from 'ramda';
  import most from 'most';
`;
const exporter = 'export default';
const knownOptionKeys = ['target', 'include', 'exclude'];

export default (options = {}) => ({
  transform(grammar, id) {
    const exclude = options.exclude;
    const include = options.include || [
      '*.pegjs',
      '**/*.pegjs'
    ];

    const filter = createFilter(include, exclude);

    const match = filter(id);
    if (!match) return;

    const passthroughOptions = R.omit(knownOptionKeys, options);
    const pegjsOptions = Object.assign({}, {
      output: 'source',
      // plugin1: {
      //   dependencies: {
      //     R: 'ramda',
      //   },
      // },
      // plugins: [
      //   plugin1,
      // ],
      // ^ fuck that
    }, passthroughOptions);

    const source = generate(grammar, pegjsOptions);
    const code = `${dependencies} ${exporter} ${source}`;
    const map = { mappings: '' };

    return { code, map };
  }
})

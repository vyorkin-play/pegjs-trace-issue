import { generate } from 'pegjs';
import { createFilter } from 'rollup-pluginutils';
import { omit } from 'ramda';

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

    const passthroughOptions = omit(knownOptionKeys, options);
    const pegjsOptions = Object.assign({}, {
      output: 'source',
    }, passthroughOptions);

    const source = generate(grammar, pegjsOptions);
    const code = `${exporter} ${source}`;
    const map = { mappings: '' };

    return { code, map };
  }
})

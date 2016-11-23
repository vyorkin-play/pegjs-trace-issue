function pass(ast, options) {
  const { plugin1: { dependencies = {} } = {} } = options;
  const imports = Object.keys(dependencies)
    .map(key => `import ${key} from '${dependencies[key]}';`)
    .join('\n');

  console.log('ast: ');
  console.log(ast);

  ast.initializer = {
    type: 'initializer',
    code: imports,
  };
}

export default {
  use(config, options) {
    const stage = config.passes.transform;
    stage.push(pass);
  }
};

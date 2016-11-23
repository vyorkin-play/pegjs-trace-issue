import parser from './grammars/hello.pegjs';

export default function run() {
  const source = `(3+5)*2`;
  try {
    const result = parser.parse(source);
    console.log(result);
  } catch (err) {
    console.log('error: ', err);
  }
}

// import parser from './grammars/twoLetters.pegjs';
import parser from './grammars/simple.pegjs';

export default function run() {
  const source = `x+8-y/z*4`;
  try {
    const result = parser.parse(source);
    console.log(result);
  } catch (err) {
    console.log('error: ', err);
  }
}

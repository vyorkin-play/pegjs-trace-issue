import parser from './grammars/playground.pegjs';

export default function run() {
  const source = 'abaaba';
  try {
    const result = parser.parse(source);
    console.log(result);
  } catch (err) {
    console.log('error: ', err);
  }
}

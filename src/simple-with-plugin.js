import parser from './grammars/simple.pegjs';

export default function run() {
  try {
    const result = parser.parse('abbabaa');
    console.log('result: ', result);
  } catch (err) {
    console.log('error: ', err);
  }
}

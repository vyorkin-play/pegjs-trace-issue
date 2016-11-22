import peg from 'pegjs';

export default function run() {
  try {
    const parser = peg.generate(`start = ('a' / 'b')+`);
    const result = parser.parse('abbabaa');
    console.log('result: ', result);
  } catch (err) {
    console.log('error: ', err);
  }
}

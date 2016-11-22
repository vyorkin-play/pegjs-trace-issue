import parser from './generated-parsers/arithmetics-parser';
import Tracer from 'pegjs-backtrace';

export default function run() {
  const grammar = `
    {
      function Number(digits) {
        this.nodeType = 'Number';
        this.value = digits.join('');
      }
    }

    expr = term ([-+] term)*
    term = factor ([*/] factor)*
    factor = '(' expr ')' / number
    number = digits:[0-9]+ { return digits.join(''); }
  `;

  const text = '1+10 a b'; // <-- example error

  const tracer = new Tracer(text);

  try {
    const result = parser.parse(text, { tracer });

    console.log('result: ', result);
  } catch (err) {
    console.log('error: ', err);
    console.log(tracer.getBacktraceString());
  }
}

import parser from './generated-parsers/arithmetics-parser';
import Tracer from 'pegjs-backtrace';

export default function run() {
  const text = '1+^a'; // <-- example error
  const tracer = new Tracer(text, { useColor: false });

  try {
    const result = parser.parse(text, { tracer });

    console.log('result: ', result);
  } catch (err) {
    console.log('error: ', err);
    console.log(tracer.getBacktraceString());
  }
}

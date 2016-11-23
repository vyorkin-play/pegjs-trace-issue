import parser from './grammars/reactive.pegjs';

export default function run() {
  const source = `
    [0, 1, 2] := 1 + 3
    [7, 6, 4] := (2 + 4) * 5
    [3, 8, 1] := 2 * 3 * 4
    [2, 7, 4] := 8 + 7
  `;
  try {
    const result = parser.parse(source);
    console.log(result);
  } catch (err) {
    console.log('error: ', err);
  }
}

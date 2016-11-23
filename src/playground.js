import parser from './grammars/reactive.pegjs';

export default function run() {
  const source = `
    [0, 1, 2] := AXYAZ
    [7, 6, 4] := ZZYAX
    [3, 8, 1] := NOTHING
    [2, 7, 4] := SOMETHING
  `;
  try {
    const result = parser.parse(source);
    console.log(result);
  } catch (err) {
    console.log('error: ', err);
  }
}

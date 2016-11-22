import peg from 'pegjs';

export default function run() {
  const grammar = `
    program = expr? ('.' [ \\n]* expr)*

    expr
      = term ([-+] term)*
      / decl

    decl = ident ' := ' expr

    ident = (digit / letter / '_')+

    digit = [0-9]

    letter = [a-zA-Z]
  `;

  try {
    const parser = peg.generate(grammar);
    const result = parser.parse(`
      x := 2+5. y := 3
    `);

    console.log('result: ', result);
  } catch (err) {
    console.log('error: ', err);
  }
}

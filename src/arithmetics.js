import peg from 'pegjs';

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
    number = digits:[0-9]+ { return new Number(digits); }
  `;

  const parser = peg.generate(grammar, { trace: true });
  const result = parser.parse('1+10', {
    tracer: {
      trace: function (evt) {
        console.log(evt);
      },
    },
  });
}

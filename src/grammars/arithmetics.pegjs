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

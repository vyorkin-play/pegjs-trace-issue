{
  function Number(digits) {
    this.nodeType ='Number';
    this.value = parseInt(digits.join(''), 10);
  }

  function String(letters) {
    this.nodeType ='String';
    this.value = letters.join('');
  }
}

start = term ([-+*/] term)+
term = (number / var)+
var = letters:[a-zA-Z]+ { return new String(letters); }
number = digits:[0-9]+ { return new Number(digits); }

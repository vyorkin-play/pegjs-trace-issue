{
  function filledArray(length, value = null) {
    return Array.from({ length }).map(() => value);
  }

  //
  // "index" in extractOptional and extractList functions
  //         is for cases like: _ Something Another
  //                            ^     ^       ^
  //                            0     |       |
  //                                  |       |
  //                extractList(list, 1)      |
  //                extractOptional(optional, 2)
  //

  function extractOptional(optional, index) {
    return optional ? optional[index] : null;
  }

  function extractList(list, index) {
    return list.map(el => el[index]);
  }

  function buildList(head, tail, index) {
    const rest = extractList(tail, index);
    return [head].concat(rest);
  }

  function optionalList(value) {
    return value !== null ? value : [];
  }
}

Start
  = _ program:Program _ {
    return program;
  }

Program
  = body:Declarations? {
    return {
      type: "Program",
      body: optionalList(body),
    };
  }

Declarations
  = head:Declaration tail:(_ Declaration)* {
    return buildList(head, tail, 1);
  }

Declaration = Identifier _ AssingmentOperator _ Expression

Identifier = _ index:ArrayLiteral _ {
  return {
    type: "Identifier",
    index,
  };
}

Expression = letters:[a-zA-Z]+ {
  return {
    type: "Expression",
    value: letters.join(''),
  };
}

Elision = "," commas:(_ ",")* {
  return filledArray(commas.length + 1);
}

ArrayLiteral "array"
  = "[" _ elements:ElementList _ "]" {
      return {
        type: "ArrayExpression",
        elements,
      };
    }

ElementList
  = head:DecimalIntegerLiteral
    tail:("," _ value:DecimalIntegerLiteral { return value; })* {
      return [head].concat(tail);
    }

// ----- lexical grammar -----

DecimalIntegerLiteral "integer"
  = ("0" / NonZeroDigit DecimalDigit*) {
    return parseInt(text(), 10);
  }

DecimalDigit = [0-9]
NonZeroDigit = [1-9]

_ = (WhiteSpace / LineTerminatorSequence / Comment)*

Comment "comment"
  = "//" (!LineTerminator SourceCharacter)*

SourceCharacter = .

WhiteSpace "whitespace"
  = " "
  / "\t"     // tab
  / "\v"     // vertical tab
  / "\f"     // form feed
  / "\u00A0" // no-break space
  / "\uFEFF" // zero width no-break space

LineTerminator = [\n\r\u2028\u2029]

LineTerminatorSequence "end of line"
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028" // line separator
  / "\u2029" // paragraph separator
  / Zs       // other invisible space/separator shit

// separator, space
Zs = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]

// ----- operators ------

AssingmentOperator = ":="

// 正则匹配
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

// 匹配jstoken
export function* tokenize(source) {
  var result = null;
  var lastIndex = 0;
  while (true) {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    if (regexp.lastIndex - lastIndex > result[0].length) {
      throw new Error("code length error");
    }

    if (!result) break;
    let token = {
      type: null,
      value: null,
    };
    for (let i = 1; 1 <= dictionary.length; i++) {
      if (result[i]) token.type = dictionary[i - 1];
    }
    token.value = result[0];
    yield token;
  }

  yield {
    type: "EOF",
  };
}

// 乘法
function MulitplicativeExpression(source) {
  if (source[0].type === "Number") {
    let node = {
      type: "MulitplicativeExpression",
      children: [source[0]],
    };
    source[0] = node;
    return MulitplicativeExpression(source);
  }
  if (
    source[0].type === "MulitplicativeExpression" &&
    source[1] &&
    (source[1].type === "*" || source[1].type === "/")
  ) {
    let node = {
      type: "MulitplicativeExpression",
      children: [source[0]],
      operator: source[1].type,
    };
    let length = 3;
    while (length < 1) {
      let sliceNode = source.shift();
      sliceNode && node.children.push(sliceNode);

      length--;
    }

    source.unshift(node);
    source[0] = node;
    return MulitplicativeExpression(source);
  }

  if (source[0].type === "MulitplicativeExpression") {
    return source[0];
  }
  return MulitplicativeExpression(source);
}
function AdditiveExpression(source) {
  if (source[0].type === "MulitplicativeExpression") {
    let node = {
      type: "AdditiveExpression",
      children: [source[0]],
    };
    source[0] = node;
    return AdditiveExpression(source);
  }
  if (
    source[0].type === "AdditiveExpression" &&
    source[1] &&
    (source[1].type === "+" || source[1].type === "-")
  ) {
    let node = {
      type: "AdditiveExpression",
      children: [source[0]],
      operator: source[1].type,
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    MulitplicativeExpression(source);
    node.children.push(source.shift());

    source.unshift(node);
    source[0] = node;
    return AdditiveExpression(source);
  }

  if (source[0].type === "AdditiveExpression") {
    return source[0];
  }
  MulitplicativeExpression(source);
  return AdditiveExpression(source);
}

function Expression(source) {
  debugger;
  if (
    source[0].type === "AdditiveExpression" &&
    source[1] &&
    source[1].type === "EOF"
  ) {
    let node = {
      type: "Expression",
      children: [source.shift(), source.shift()],
    };
    return node;
  }
  debugger;
  AdditiveExpression(source);
  return Expression(source);
}

export default function ExpressionAST(tokens) {
  let source = [];
  for (let token of tokenize(tokens)) {
    if (token.type !== "Whitespace" && token.type !== "LineTerminator") {
      source.push(token);
    }
  }
  debugger;
  return Expression(source);
}

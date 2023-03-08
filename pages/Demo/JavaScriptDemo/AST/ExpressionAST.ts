// 正则匹配
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

type JsNodeType =
  | "Number"
  | "Whitespace"
  | "LineTerminator"
  | "EOF"
  | "Expression"
  | "MulitplicativeExpression"
  | "AdditiveExpression"
  | "*"
  | "/"
  | "+"
  | "-";
const dictionary: JsNodeType[] = [
  "Number",
  "Whitespace",
  "LineTerminator",
  "*",
  "/",
  "+",
  "-",
];

interface JSToken {
  type: JsNodeType | JsNodeType | null;
}
interface JSNodeDto {
  type: JsNodeType | JsNodeType | null;
  children?: JSNodeDto[];
  value?: string | null;
  operator?: JsNodeType;
}

// 匹配jstoken
export function* tokenize(source: string) {
  var result: RegExpExecArray | null = null;
  var lastIndex = 0;
  console.log("source", source);

  while (true) {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    if (result?.[0] && regexp.lastIndex - lastIndex < result[0].length) {
      throw new Error("code length error");
    }

    if (!result) break;
    let token: JSNodeDto = {
      type: null,
      value: null,
    };
    for (var i = 1; i <= dictionary.length; i++) {
      if (result[i]) token.type = dictionary[i - 1];
    }
    token.value = result[0];
    yield token;
  }

  yield {
    type: "EOF",
  } as JSToken;
}

// 乘法
function MulitplicativeExpression(
  source: JSNodeDto[]
): JSNodeDto[] | JSNodeDto {
  if (source[0].type === "Number") {
    let node: JSNodeDto = {
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
    let node: JSNodeDto = {
      type: "MulitplicativeExpression",
      children: [],
      operator: source[1].type,
    };
    node.children!.push(source!.shift() as JSNodeDto);
    node.children!.push(source!.shift() as JSNodeDto);
    node.children!.push(source!.shift() as JSNodeDto);

    source.unshift(node);
    source[0] = node;
    return MulitplicativeExpression(source);
  }

  if (source[0].type === "MulitplicativeExpression") {
    return source[0];
  }
  return MulitplicativeExpression(source);
}
function AdditiveExpression(source: JSNodeDto[]): JSNodeDto[] | JSNodeDto {
  if (source[0].type === "MulitplicativeExpression") {
    let node: JSNodeDto = {
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
    let node: JSNodeDto = {
      type: "AdditiveExpression",
      children: [],
      operator: source[1].type,
    };
    node.children!.push(source!.shift() as JSNodeDto);
    node.children!.push(source!.shift() as JSNodeDto);
    MulitplicativeExpression(source);
    node.children!.push(source!.shift() as JSNodeDto);

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

function Expression(source: JSNodeDto[]): JSNodeDto {
  if (
    source[0].type === "AdditiveExpression" &&
    source[1] &&
    source[1].type === "EOF"
  ) {
    let node: JSNodeDto = {
      type: "Expression",
      children: [source.shift() as JSNodeDto, source.shift() as JSNodeDto],
    };
    return node;
  }
  AdditiveExpression(source);
  return Expression(source);
}

export default function ExpressionAST(tokens: string) {
  let source: JSNodeDto[] = [];
  for (let token of tokenize(tokens)) {
    if (token.type !== "Whitespace" && token.type !== "LineTerminator") {
      source.push(token);
    }
  }
  return Expression(source);
}

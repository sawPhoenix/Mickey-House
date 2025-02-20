enum TokenType {
  paren = "paren",
  number = "number",
  string = "string",
  name = "name",
}
interface Token {
  type: TokenType;
  value: string;
}
enum NodeType {
  Program = "Program",
  CallExpression = "CallExpression",
  Identifier = "Identifier",
  NumberLiteral = "NumberLiteral",
  StringLiteral = "StringLiteral",
  ExpressionStatement = "ExpressionStatement",
}
function tokenizer(input: string): Array<Token> {
  let current = 0;
  let tokens: Array<Token> = [];
  while (current < input.length) {
    let char = input[current];
    if (char === "(" || char === ")") {
      tokens.push({
        type: TokenType.paren,
        value: char,
      });
      current++;
      continue;
    }
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: TokenType.number, value });
      continue;
    }
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: TokenType.name, value });
      continue;
    }
    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: TokenType.string, value });
      continue;
    }

    throw new TypeError("I dont know what this character is: " + char);
  }
  return tokens;
}
type ASTNodeType = {
  type: NodeType;
  body?: Array<ASTNodeType>;
  value?: string;
  name?: string;
  _context?: Array<ASTNodeType>;
  expression?: ASTNodeType;
  params?: Array<ASTNodeType>;
  arguments?: Array<ASTNodeType>;
  callee?: {
    type: NodeType.Identifier;
    name?: string;
  };
};
function parser(tokens: Array<Token>) {
  // 定义一个 AST 节点的类型
  let current = 0;
  function walk() {
    let token = tokens[current];
    if (token.type === "number") {
      current++;
      return {
        type: NodeType.NumberLiteral,
        value: token.value,
      };
    }
    if (token.type === "string") {
      current++;
      return {
        type: NodeType.StringLiteral,
        value: token.value,
      };
    }
    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      let node: ASTNodeType = {
        type: NodeType.CallExpression,
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params!.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }

    throw new TypeError(token.value + " is not a valid token");
  }
  let ast: ASTNodeType = {
    type: NodeType.Program,
    body: [],
  };
  while (current < tokens.length) {
    ast.body!.push(walk());
  }
  return ast;
}
function traverser(ast: ASTNodeType, visitor: any) {
  function traverseArray(array: Array<any>, parent: any) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }
  function traverseNode(node: ASTNodeType, parent: any) {
    let methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    switch (node.type) {
      case NodeType.Program:
        traverseArray(node.body!, node);
        break;
      case NodeType.CallExpression:
        traverseArray(node.params!, node);
        break;
      case NodeType.NumberLiteral:
      case NodeType.StringLiteral:
        break;
    }
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  traverseNode(ast, null);
}
function transformer(ast: ASTNodeType) {
  // create a new ast
  let newAst = {
    type: NodeType.Program,
    body: [],
  };
  ast._context = newAst.body;
  traverser(ast, {
    [NodeType.NumberLiteral]: {
      enter(node: ASTNodeType, parent: ASTNodeType) {
        parent!._context!.push({
          type: NodeType.NumberLiteral,
          value: node.value,
        });
      },
    },
    [NodeType.StringLiteral]: {
      enter(node: ASTNodeType, parent: ASTNodeType) {
        parent!._context!.push({
          type: NodeType.StringLiteral,
          value: node.value,
        });
      },
    },
    [NodeType.CallExpression]: {
      enter(node: ASTNodeType, parent: ASTNodeType) {
        let expression: ASTNodeType = {
          type: NodeType.CallExpression,
          callee: {
            type: NodeType.Identifier,
            name: node.name,
          },
          arguments: [],
        };
        node._context = expression.arguments;
        if (parent!.type !== NodeType.CallExpression) {
          expression = {
            type: NodeType.ExpressionStatement,
            expression,
          };
        }
        parent!._context!.push(expression);
      },
    },
  });
  return newAst;
}
function codeGenerator(ast: ASTNodeType): string | undefined {
  switch (ast.type) {
    case NodeType.Program:
      return ast.body!.map(codeGenerator).join("\n");
    case NodeType.ExpressionStatement:
      return codeGenerator(ast.expression!) + ";";
    case NodeType.CallExpression:
      return (
        codeGenerator(ast.callee!) +
        "(" +
        ast.arguments!.map(codeGenerator).join(",") +
        ")"
      );
    case NodeType.NumberLiteral:
      return ast.value;
    case NodeType.StringLiteral:
      return '"' + ast.value + '"';
    case NodeType.Identifier:
      return ast.name;
    default:
      throw new TypeError(ast.type + " is not a valid type");
  }
}
export default function compiler(code: string) {
  console.log(code, "code");
  let tokens = tokenizer(code);
  console.log(tokens);
  let ast = parser(tokens);

  console.log(ast, "ast");
  let newAst = transformer(ast);
  console.log(newAst, "newAst");
  let output = codeGenerator(newAst);
  console.log(output, "output");
  return output;
}

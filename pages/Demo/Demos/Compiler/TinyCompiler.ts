import { TorusKnotGeometryProps } from "react-three-fiber";
enum TokenTypeEnum {
  PAREN = "paren",
  STRING = "string",
  NUMBER = "number",
  NAME = "name",
}
enum ASTTypeEnum {
  CALLEXPRESSION = "CallExpression", // 函数
  PROGRAM = "Program", // AST
  NUMBERLITERAL = "NumberLiteral",
  EXPRESSIONSTATEMENT = "ExpressionStatement",
  STRINGLITERAL = "StringLiteral",
  IDENTIFIER = "Identifier",
}
export interface ParserBaseNodeType {
  type: ASTTypeEnum.NUMBERLITERAL | ASTTypeEnum.STRINGLITERAL;
  value: string;
}
export interface ParserFnNodeType {
  type: ASTTypeEnum.CALLEXPRESSION;
  name: string;
  params: ParserChildType[];
}
export interface ParserASTType {
  type: ASTTypeEnum.PROGRAM;
  body: ParserChildType[];
}
interface CalleeType {
  type: ASTTypeEnum.IDENTIFIER;
  name: string;
}
interface CALLExpressionType {
  type: ASTTypeEnum.CALLEXPRESSION;
  callee: CalleeType;
  arguments: ASTNodeType[] | [];
}
interface ExpressionStatementType {
  type: ASTTypeEnum.EXPRESSIONSTATEMENT;
  expression: ASTNodeType;
}
type ExpressionType = CALLExpressionType | ExpressionStatementType;
export interface ASTParentBaseType {
  type: ASTTypeEnum;
  _context: ASTNodeType[];
}
type ParserChildType = ParserBaseNodeType | ParserFnNodeType;
type ASTNodeType =
  | ParserASTType
  | ParserChildType
  | ExpressionType
  | ASTParentBaseType
  | CalleeType;
type ASTParentType = ASTNodeType | null;
export interface TokenList {
  type: TokenTypeEnum;
  value: any;
}
export function tokenizer(input: string[]) {
  let current = 0;
  let tokens: TokenList[] = [];
  while (current < input.length) {
    let char = input[current];

    // 左括号
    if (char === "(") {
      tokens.push({
        type: TokenTypeEnum.PAREN,
        value: "(",
      });

      current++;

      continue;
    }

    // 右括号
    if (char === ")") {
      tokens.push({
        type: TokenTypeEnum.PAREN,
        value: ")",
      });
      current++;
      continue;
    }
    // 空格
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 数字
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: TokenTypeEnum.NUMBER, value });
    }

    // 字符串
    if (char === '"') {
      let value = "";
      char = input[++current];
      value += char;
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({
        type: TokenTypeEnum.STRING,
        value,
      });
    }

    // name
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: TokenTypeEnum.NAME, value });
      continue;
    }
    throw new TypeError("I dont know what this character is: " + char);
  }
  return tokens;
}

export function parser(tokens: TokenList[]): ASTNodeType {
  let current = 0;

  function walk(): ParserChildType {
    let token = tokens[current];
    if (token.type === TokenTypeEnum.NUMBER) {
      current++;
      return {
        type: ASTTypeEnum.NUMBERLITERAL,
        value: token.value,
      };
    }
    if (token.type === TokenTypeEnum.STRING) {
      current++;
      return {
        type: ASTTypeEnum.STRINGLITERAL,
        value: token.value,
      };
    }
    if (token.type === TokenTypeEnum.PAREN && token.value === "(") {
      token = tokens[++current];
      // 创建一个基本节点
      let node: ASTNodeType = {
        type: ASTTypeEnum.CALLEXPRESSION,
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      while (
        token.type !== TokenTypeEnum.PAREN ||
        (token.type === TokenTypeEnum.PAREN && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }
    throw new TypeError(token.type);
  }
  let ast: ASTNodeType = {
    type: ASTTypeEnum.PROGRAM,
    body: [],
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

type VisitorType = {
  [key in ASTTypeEnum]: {
    enter?: (node: any, parent: ASTParentType) => void;
    exit?: (node: any, parent: ASTParentType) => void;
    _context?: any[];
  };
};

export function traverser(ast: ASTNodeType, visitor: VisitorType) {
  function traverserArray(array: ParserChildType[], parent: ASTParentType) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }
  function traverseNode(node: ASTNodeType, parent: ASTParentType) {
    let methods = visitor[node.type];
    methods?.enter?.(node, parent);
    switch (node.type) {
      case ASTTypeEnum.PROGRAM:
        traverserArray((node as ParserASTType).body, node);
      case ASTTypeEnum.CALLEXPRESSION:
        traverserArray((node as ParserFnNodeType).params, node);
      case ASTTypeEnum.NUMBERLITERAL:
        break;
      case ASTTypeEnum.STRINGLITERAL:
        break;
      default:
        throw new TypeError("类型错误");
    }
    methods?.exit?.(node, parent);
  }
  traverseNode(ast, null);
}

export function transformer(ast: any) {
  let newAst: ParserASTType = {
    type: ASTTypeEnum.PROGRAM,
    body: [],
  };
  ast._context = newAst.body;
  traverser(ast, {
    [ASTTypeEnum.NUMBERLITERAL]: {
      enter(node: ParserBaseNodeType, parent: ASTParentType) {
        (parent as ASTParentBaseType)._context.push({
          type: ASTTypeEnum.NUMBERLITERAL,
          value: node.value,
        });
      },
    },
    [ASTTypeEnum.STRINGLITERAL]: {
      enter(node: ParserBaseNodeType, parent: ASTParentType) {
        (parent as ASTParentBaseType)._context.push({
          type: ASTTypeEnum.STRINGLITERAL,
          value: node.value,
        });
      },
    },
    [ASTTypeEnum.CALLEXPRESSION]: {
      enter(node: any, parent: ASTParentType) {
        let expression: ExpressionType = {
          type: ASTTypeEnum.CALLEXPRESSION,
          callee: {
            type: ASTTypeEnum.IDENTIFIER,
            name: node.name,
          },
          arguments: [],
        };
        node._context = expression.arguments;
        if (parent?.type !== ASTTypeEnum.CALLEXPRESSION) {
          expression = {
            type: ASTTypeEnum.EXPRESSIONSTATEMENT,
            expression: expression,
          };
        }
        (parent as ASTParentBaseType)._context.push(expression);
      },
    },
    Program: {
      enter: undefined,
      exit: undefined,
    },
    ExpressionStatement: {
      enter: undefined,
      exit: undefined,
    },
    Identifier: {
      enter: undefined,
      exit: undefined,
      _context: undefined,
    },
  });
  return newAst;
}

export function codeGenerator(node: ASTNodeType): string {
  switch (node.type) {
    case ASTTypeEnum.PROGRAM:
      return (node as ParserASTType).body.map(codeGenerator).join("\n");
    case ASTTypeEnum.EXPRESSIONSTATEMENT:
      return codeGenerator((node as ExpressionStatementType).expression) + ";";
    case ASTTypeEnum.IDENTIFIER:
      return (node as CalleeType).name;
    case ASTTypeEnum.NUMBERLITERAL:
      return (node as ParserBaseNodeType).value;
    case ASTTypeEnum.STRINGLITERAL:
      return '"' + (node as ParserBaseNodeType).value + '"';
    default:
      throw new TypeError(node.type);
  }
}

export function compiler(input: string[]) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);
  return output;
}

import { Kind, ASTNode } from "graphql"

export const parseLiteral = (
  ast: ASTNode
): string | boolean | number | object | null => {
  switch (ast.kind) {
    case Kind.STRING:
      return ast.value
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
      return parseInt(ast.value, 10)
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT:
      return ast.fields.reduce((hash, { name, value }) => {
        hash[name.value] = parseLiteral(value)
        return hash
      }, {} as Record<any, any>)
    case Kind.LIST:
      return ast.values.map(parseLiteral)
    default:
      return null
  }
}

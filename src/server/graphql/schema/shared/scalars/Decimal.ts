import { Kind } from 'graphql';
import { scalarType } from 'nexus';

export const Decimal = scalarType({
  name: 'Decimal',
  asNexusMethod: 'decimal',
  description: 'Decimal custom scalar type',
  parseValue(value) {
    return Number(value);
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT) {
      return Number(ast.value);
    }
    return null;
  }
});

export default Decimal;

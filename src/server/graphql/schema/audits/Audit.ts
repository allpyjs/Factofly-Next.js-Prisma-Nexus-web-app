import { User } from '@prisma/client';
import { objectType } from 'nexus';
import { GraphQLContext } from '../../context';

export const Audit = objectType({
  name: 'Audit',
  definition(t) {
    t.implements('Node');
    t.BigInt('userId');
    t.field('user', {
      type: 'User',
      description: 'User who performed the action',
      // @ts-ignore TODO: Typescript complains about converting Decimal to number here
      resolve: async (parent, _, context: GraphQLContext) => {
        if (!parent.userId) return null;
        const user: User | null = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        return user;
      }
    });
    t.BigInt('recordId');
    t.string('recordType');
    t.string('event');
    t.string('value', { resolve: (parent: any) => (parent.value ? JSON.stringify(parent.value) : null) });
    t.string('updatedValue', {
      resolve: (parent: any) => (parent.updatedValue ? JSON.stringify(parent.updatedValue) : null)
    });
  }
});

export default Audit;

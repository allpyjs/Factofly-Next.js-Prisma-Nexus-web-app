import { interfaceType } from 'nexus';

const allowedModels = {
  CooperationAgreement: 'CooperationAgreement'
};

export const CustomerRelation = interfaceType({
  name: 'CustomerRelation',
  resolveType: (s, c, { parentType }) => {
    const type = parentType.toString();
    if (type in allowedModels) {
      return type as keyof typeof allowedModels;
    }
    return null;
  },
  definition(t) {
    t.BigInt('customerId', {
      description: 'Customer ID',
      resolve: (source) => source?.customerId || null
    });
    t.nonNull.field('customer', {
      type: 'Customer',
      description: 'Linked customer',
      resolve: async (parent, _, context) => {
        const customer = await context.prisma.customer.findUnique({
          where: { id: parent.customerId }
        });
        if (!customer) {
          throw new Error('No matching customer found');
        }
        return customer;
      }
    });
  }
});

export default CustomerRelation;

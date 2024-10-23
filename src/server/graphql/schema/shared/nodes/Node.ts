import { interfaceType } from 'nexus';

const allowedModels = {
  // Address: 'Address',
  // Country: 'Country',
  // Customer: 'Customer',
  // Invoice: 'Invoice',
  // InvoiceLine: 'InvoiceLine',
  // JobType: 'JobType',
  // StatusLog: 'StatusLog',
  // Task: 'Task',
  User: 'User'
  // UserAction: 'UserAction',
  // DecryptLog: 'DecryptLog'
};

export const Node = interfaceType({
  name: 'Node',
  resolveType: (item, context, { parentType }) => {
    const type = parentType.toString();
    if (type && type in allowedModels) {
      return type as keyof typeof allowedModels;
    }
    return null;
  },
  definition(t) {
    t.nonNull.id('urn', {
      description: 'Universal unique identifier',
      resolve(parent, args, context, { parentType }) {
        return `urn:factofly:${parentType.toString()}:${parent.id}`;
      }
    });
    t.nonNull.BigInt('id', { description: 'Unique identifier for this type' });
    t.nonNull.field('createdDate', {
      type: 'DateTime',
      description: 'When the node was created'
    });
    t.nonNull.field('updatedDate', {
      type: 'DateTime',
      description: 'When the node was last updated'
    });
  }
});

export default Node;

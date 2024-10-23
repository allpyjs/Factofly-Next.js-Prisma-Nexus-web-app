import { interfaceType } from 'nexus';

const allowedModels = {
  Address: 'Address',
  //   Customer: 'Customer',
  Invoice: 'Invoice'
  //   InvoiceLine: 'InvoiceLine',
  //   StatusLog: 'StatusLog',
  //   Task: 'Task',
  //   UserAction: 'UserAction',
  //   UserSettings: 'UserSettings',
  //   UserSecrets: 'UserSecrets',
  //   Product: 'Product',
  //   Notification: 'Notification',
  //   DecryptLog: 'DecryptLog'
};

export const Owned = interfaceType({
  name: 'Owned',
  resolveType: (s, c, { parentType }) => {
    const type = parentType.toString();
    if (type in allowedModels) {
      return type as keyof typeof allowedModels;
    }
    return null;
  },
  definition(t) {
    t.BigInt('userId', {
      description: 'Owning user id',
      resolve: (source) => source?.userId || null
    });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the item',
      resolve: async (parent, _, context) => {
        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }
        return user;
      }
    });
  }
});

export default Owned;

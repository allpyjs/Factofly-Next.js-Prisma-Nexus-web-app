import { objectType } from 'nexus';
import { Context } from '../../context';

export const Deduction = objectType({
  name: 'Deduction',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');
    t.nonNull.string('description', { description: 'Short description of the deduction' });
    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.decimal('total', { description: 'Total amount of the deduction' });
    t.decimal('totalDkk', { description: 'Total amount of the deduction in Danish Krone' });
    t.boolean('includeVat', { description: 'Whether the deduction includes VAT or not' });
    t.string('currency', { description: 'Currency that the deduction is in' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the deduction',
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

    t.field('imageUrl', {
      type: 'String',
      description: 'Url that the deduction image can be viewed at',
      resolve: async (parent, _, context: Context) => {
        const blob = await context.prisma.attachmentBlob.findFirst({
          where: { attachment: { some: { recordType: 'Deduction', recordId: parent.id } } },
          orderBy: { createdDate: 'desc' }
        });
        if (!blob) {
          return null;
        }
        return `/api/deduction-file/${parent.id}/${blob.filename}`;
      }
    });

    t.nonNull.field('status', { type: 'DeductionStatusEnum', description: 'Status enum' });
    t.nonNull.boolean('active');

    t.nonNull.field('createdDate', {
      type: 'DateTime',
      description: 'When item were created'
    });
    t.nonNull.field('updatedDate', {
      type: 'DateTime',
      description: 'When item last were updated'
    });
  }
});

export default Deduction;

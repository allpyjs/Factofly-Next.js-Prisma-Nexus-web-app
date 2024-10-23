import { objectType } from 'nexus';

export const JobType = objectType({
  name: 'JobType',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('description', { description: 'Description of job' });
    t.nonNull.string('name_en', { description: 'Name of the job in English' });
    t.nonNull.string('name_da', { description: 'Name of the job in Danish' });
    t.string('classification', { description: 'Classification of job' });
    t.nonNull.boolean('group', { description: 'Classification of job' });

    t.BigInt('parentId', { description: 'Classification of job' });
    t.field('parent', {
      description: 'Classification of job',
      type: 'JobType',
      resolve: async (parent, _, context) => {
        if (!parent?.parentId) {
          return null;
        }
        const jobType = await context.prisma.jobType.findUnique({
          where: { id: parent.parentId }
        });
        if (!jobType) {
          throw new Error('No matching jobType found');
        }
        return jobType;
      }
    });

    t.nonNull.boolean('active', {
      description: 'Whether or not the item is active. Soft delete items if false'
    });
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
export default JobType;

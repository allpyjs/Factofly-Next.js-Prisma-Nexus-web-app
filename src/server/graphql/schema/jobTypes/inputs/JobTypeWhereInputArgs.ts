import { inputObjectType } from 'nexus';

export const JobTypeWhereInputArgs = inputObjectType({
  name: 'JobTypeWhereInputArgs',
  definition(t) {
    t.field('active', { type: 'BoolFilter' });
    t.field('classification', { type: 'StringFilter' });
    t.field('name', { type: 'StringFilter' });
    t.field('description', { type: 'StringFilter' });
    t.BigInt('id');
    t.field('group', { type: 'BoolFilter' });
    t.field('parent', { type: 'JobTypeWhereInputArgs' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
  }
});

export default JobTypeWhereInputArgs;

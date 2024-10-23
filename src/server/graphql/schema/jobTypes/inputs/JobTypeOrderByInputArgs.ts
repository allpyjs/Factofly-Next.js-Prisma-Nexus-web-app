import { inputObjectType } from 'nexus';

export const JobTypeOrderByInputArgs = inputObjectType({
  name: 'JobTypeOrderByInputArgs',
  definition(t) {
    t.field('classification', { type: 'SortOrder' });
    t.field('description', { type: 'SortOrder' });
    t.field('id', { type: 'SortOrder' });
    t.field('name_en', { type: 'SortOrder' });
    t.field('name_da', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('active', { type: 'SortOrder' });
    t.field('group', { type: 'SortOrder' });
    t.field('parentId', { type: 'SortOrder' });
  }
});
export default JobTypeOrderByInputArgs;

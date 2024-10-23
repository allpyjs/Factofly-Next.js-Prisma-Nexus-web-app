import { objectType } from 'nexus';

export const BulkUpdateResult = objectType({
  name: 'BulkUpdateResult',
  definition(t) {
    t.boolean('success');
  }
});

export default BulkUpdateResult;

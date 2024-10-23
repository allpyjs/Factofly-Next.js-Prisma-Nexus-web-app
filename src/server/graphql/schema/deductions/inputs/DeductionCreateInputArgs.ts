import { inputObjectType } from 'nexus';

export const DeductionCreateInputArgs = inputObjectType({
  name: 'DeductionCreateInputArgs',
  definition(t) {
    t.nonNull.string('description');
    t.nonNull.field('status', { type: 'DeductionStatusEnum' });
    t.BigInt('createAsUserId');
    t.nonNull.decimal('total');
    t.nonNull.boolean('includeVat');
    t.nonNull.string('currency');
  }
});

export default DeductionCreateInputArgs;

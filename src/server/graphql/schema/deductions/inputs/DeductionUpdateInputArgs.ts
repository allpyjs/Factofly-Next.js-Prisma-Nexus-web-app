import { inputObjectType } from 'nexus';

export const DeductionUpdateInputArgs = inputObjectType({
  name: 'DeductionUpdateInputArgs',
  definition(t) {
    t.string('description');
    t.boolean('active');
    t.field('status', { type: 'DeductionStatusEnum' });
    t.decimal('total');
    t.boolean('includeVat');
    t.string('currency');
  }
});
export default DeductionUpdateInputArgs;

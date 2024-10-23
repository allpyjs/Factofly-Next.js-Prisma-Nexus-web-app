import { objectType } from 'nexus';

export const Deliverable = objectType({
  name: 'Deliverable',
  definition(t) {
    t.implements('Node');

    t.nonNull.string('description');
  }
});

export default Deliverable;

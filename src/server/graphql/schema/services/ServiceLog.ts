import { objectType } from 'nexus';

export const ServiceLog = objectType({
  name: 'ServiceLog',
  definition(t) {
    t.implements('Node');

    t.string('service');
    t.BigInt('recordId');
    t.field('recordType', { type: 'RecordTypeEnum' });
    t.string('message');
    t.string('status');
  }
});

export default ServiceLog;

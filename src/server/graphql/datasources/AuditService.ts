import { RecordType } from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import deepEqual from 'deep-equal';
import stringify from '~/utils/stringify';
import { IContextData } from '../IContextData';

// This ensures that bigints are serialized properly instead of throwing an error in prisma.
const cleanData = (input: any) => JSON.parse(stringify(input));

export default class AuditService extends DataSource {
  context!: IContextData;

  initialize(config: DataSourceConfig<IContextData>): void {
    this.context = config.context;
  }

  async log(
    event: 'create' | 'update',
    recordId: bigint,
    recordType: RecordType,
    value: any,
    updatedValue?: any
  ) {
    const cleanedValue = value ? cleanData(value) : undefined;
    const cleanedUpdatedValue = updatedValue ? cleanData(updatedValue) : undefined;

    if (cleanedUpdatedValue) {
      // only show the changed items

      Object.keys(cleanedValue).forEach((x) => {
        if (deepEqual(cleanedValue[x], cleanedUpdatedValue[x])) {
          delete cleanedValue[x];
          delete cleanedUpdatedValue[x];
        }
      });
    }

    if (JSON.stringify(cleanedValue) === JSON.stringify(cleanedUpdatedValue)) {
      // ignore if nothing has been updated.
      return;
    }

    await this.context.prisma.audit.create({
      data: {
        event,
        recordId: Number(recordId),
        user: { connect: { id: this.context.user!.id } },
        recordType,
        value: cleanedValue,
        updatedValue: cleanedUpdatedValue
      }
    });
  }
}

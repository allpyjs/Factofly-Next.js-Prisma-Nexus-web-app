import { RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import convertCurrency from '../../../utils/convertCurrency';
import { NexusGenObjects } from '../../.generated/nexus-typegen';
import { Context } from '../../context';
import cleanDeductionCreateArgs from './helpers/cleanDeductionCreateArgs';

export const CreateDeductionMutation = mutationField((t) => {
  t.field('createDeduction', {
    type: 'Deduction',
    args: {
      data: nonNull(arg({ type: 'DeductionCreateInputArgs' }))
    },
    authorize: (_, { data }, context: Context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }
      if (data.createAsUserId && !context.auth.isAdmin(context.user)) {
        return false;
      }
      return true;
    },
    resolve: async (_, { data }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }

      const deductionData = await cleanDeductionCreateArgs(
        data,
        context,
        data.createAsUserId ?? context.user.id
      );

      if (deductionData.currency && deductionData.total) {
        if (deductionData.currency === 'DKK') {
          deductionData.totalDkk = deductionData.total;
        } else {
          deductionData.conversionDate = new Date();
          deductionData.totalDkk = await convertCurrency(
            deductionData.currency,
            'DKK',
            deductionData.total,
            deductionData.conversionDate
          );
          deductionData.conversionRate = deductionData.totalDkk / deductionData.total;
        }
      }

      const deduction = await context.prisma.deduction.create({
        data: {
          ...deductionData
        },
        include: { user: true }
      });

      // notify services
      const {
        dataSources: { auditService, notificationService, eventService }
      } = context;

      await Promise.all([
        auditService.log('create', deduction.id, RecordType.DEDUCTION, deductionData),
        notificationService.deductionCreated(deduction),
        eventService.recordEvent('deduction-created', { deductionId: deduction.id, status: deduction.status })
      ]);

      return deduction as NexusGenObjects['Deduction'];
    }
  });
});

export default CreateDeductionMutation;

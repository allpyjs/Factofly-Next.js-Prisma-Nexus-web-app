import { useMutation, ApolloError } from '@apollo/client';
import { useCallback } from 'react';
import { SalaryStatusEnum } from '~/.generated/globalTypes';

import { UpdateSalaryMutation as UpdateSalaryMutationType } from './graphql/.generated/UpdateSalaryMutation';
import UpdateSalaryMutation from './graphql/UpdateSalaryMutation.gql';

type UpdateSalaryEvents = {
  onCompleted?: (data: UpdateSalaryMutationType) => void;
  onError?: (error: ApolloError) => void;
};

type UpdateSalaryParams = {
  id: number;
  paymentDate?: Date;
  status?: SalaryStatusEnum;
  invoices?: number[];
  deductions?: number[];
};

export default function useUpdateSalary() {
  const [updateMutation, { loading: updating, error: updateError }] = useMutation<UpdateSalaryMutationType>(
    UpdateSalaryMutation,
    {
      refetchQueries: ['SalaryDetailsQuery', 'SalaryCompleteViewQuery']
    }
  );

  const updateSalary = useCallback(
    (data: UpdateSalaryParams, events?: UpdateSalaryEvents) => {
      updateMutation({
        variables: { input: data, where: { id: data.id } },
        ...events
      });
    },
    [updateMutation]
  );

  return {
    updateSalary,
    updating,
    updateError
  };
}

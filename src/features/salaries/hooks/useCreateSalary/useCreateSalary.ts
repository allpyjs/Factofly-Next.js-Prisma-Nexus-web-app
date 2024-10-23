import { useMutation, ApolloError } from '@apollo/client';
import { useCallback } from 'react';

import { CreateSalaryMutation as CreateSalaryMutationType } from './graphql/.generated/CreateSalaryMutation';
import CreateSalaryMutation from './graphql/CreateSalaryMutation.gql';

type CreateSalaryEvents = {
  onCompleted?: (data: CreateSalaryMutationType) => void;
  onError?: (error: ApolloError) => void;
};

type CreateSalaryParams = { paymentDate: Date; userId: number };

export default function useCreateSalary() {
  const [createMutation, { loading: updating, error: createError }] = useMutation<CreateSalaryMutationType>(
    CreateSalaryMutation,
    {
      refetchQueries: ['SalaryDetailsQuery']
    }
  );

  const createSalary = useCallback(
    (data: CreateSalaryParams, events: CreateSalaryEvents) => {
      createMutation({
        variables: { input: data },
        ...events
      });
    },
    [createMutation]
  );

  return {
    createSalary,
    updating,
    createError
  };
}

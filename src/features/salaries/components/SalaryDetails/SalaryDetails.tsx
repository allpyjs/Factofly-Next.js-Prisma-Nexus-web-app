import { useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { DeductionStatusEnum, InvoiceStatusEnum, SalaryStatusEnum } from '~/.generated/globalTypes';
import useUpdateDeductions from '~/features/deductions/hooks/useUpdateDeductions';
import SubmitButton from '~/features/forms/components/SubmitButton';
import DeductionList from './DeductionList';
import { SalaryViewQuery_items_edges_node as InvoiceType } from '../SalaryView/graphql/.generated/SalaryViewQuery';
import { SalaryViewUserDetailsQuery as SalaryViewUserDetailsQueryType } from '../SalaryView/graphql/.generated/SalaryViewUserDetailsQuery';
import SalaryViewUserDetailsQuery from '../SalaryView/graphql/SalaryViewUserDetailsQuery.gql';
import { SalaryDetailsQuery as SalaryDetailsQueryType } from './graphql/.generated/SalaryDetailsQuery';
import SalaryDetailsQuery from './graphql/SalaryDetailsQuery.gql';
import useCreateSalary from '~/features/salaries/hooks/useCreateSalary';
import useUpdateSalary from '~/features/salaries/hooks/useUpdateSalary';
import { dateOnly } from '~/utils/dateHelpers';
import SalaryInvoiceDetailsCard from '../SalaryInvoiceDetailsCard';
import SalaryUserDetailsCard from '../SalaryUserDetailsCard';

type SalaryDetailsProps = {
  user: { id: number; paymentDate: Date; invoices?: InvoiceType[] };
  onSalaryPaid?: (id: number) => void;
};

export default function SalaryDetails({ user: salaryUser, onSalaryPaid }: SalaryDetailsProps) {
  const { t } = useTranslation('salaries');
  const { t: tUsers } = useTranslation('users');
  const { enqueueSnackbar } = useSnackbar();
  const { t: tInvoices } = useTranslation('invoices');
  const { createSalary, updating: creatingSalary } = useCreateSalary();
  const { updateSalary, updating: updatingSalary } = useUpdateSalary();
  const { updateDeductions } = useUpdateDeductions();
  const router = useRouter();

  const updating = creatingSalary || updatingSalary;

  // check if there's an existing salary for this user, and create it if it doesn't exist
  const {
    data: salariesData,
    loading: loadingSalariesData,
    error: salariesDataError,
    refetch
  } = useQuery<SalaryDetailsQueryType>(SalaryDetailsQuery, {
    variables: {
      first: 10,
      where: {
        user: { id: { equals: salaryUser.id } },
        paymentDate: { equals: dateOnly(salaryUser.paymentDate) },
        status: { equals: SalaryStatusEnum.DRAFT }
      },
      orderBy: { id: 'desc' }
    }
  });

  useEffect(() => {
    refetch({
      variables: {
        first: 10,
        where: {
          user: { id: { equals: salaryUser.id } },
          paymentDate: { equals: dateOnly(salaryUser.paymentDate) }
        },
        orderBy: { id: 'desc' }
      }
    });
  }, [refetch, salaryUser.id, salaryUser.paymentDate]);

  const salary =
    salariesData?.items.edges && salariesData?.items.edges.length > 0
      ? salariesData?.items.edges[0].node
      : null;
  const salaryId = salary?.id;

  const sendToZenegy = useCallback(() => {
    const onCompleted = (id: number) => {
      enqueueSnackbar(tInvoices('messages.salaryUpdated'), { variant: 'success' });
      if (onSalaryPaid) {
        onSalaryPaid(id);
      }

      router.push(`/admin/salaries?salaryId=${id}`);
    };
    const onError = () => {
      enqueueSnackbar(tInvoices('errors.salaryUpdate'), { variant: 'error' });
    };

    const invoices = salaryUser.invoices?.map((x) => x.id);
    const sendSalary = (id: number) =>
      updateSalary(
        { id, paymentDate: salaryUser.paymentDate, invoices, status: SalaryStatusEnum.SENT },
        { onCompleted: () => onCompleted(id), onError }
      );

    if (salaryId) {
      sendSalary(salaryId);
    } else {
      createSalary(
        { paymentDate: salaryUser.paymentDate, userId: salaryUser.id },
        {
          onCompleted: (data) => sendSalary(data.createSalary?.id)
        }
      );
    }
  }, [createSalary, updateSalary, salaryId, salaryUser, onSalaryPaid, enqueueSnackbar, tInvoices, router]);

  const addDeductionsToSalary = useCallback(
    (deductions: number[]) => {
      const onCompleted = () =>
        enqueueSnackbar(tInvoices('messages.deductionsApproved'), { variant: 'success' });
      const onError = () => {
        enqueueSnackbar(tInvoices('errors.deductionsApproval'), { variant: 'error' });
      };

      if (salaryId) {
        updateSalary({ id: salaryId, paymentDate: salaryUser.paymentDate, deductions }, { onCompleted });
      } else {
        createSalary(
          { paymentDate: salaryUser.paymentDate, userId: salaryUser.id },
          {
            onCompleted: (data) =>
              updateSalary(
                { id: data.createSalary?.id, paymentDate: salaryUser.paymentDate, deductions },
                { onCompleted, onError }
              ),
            onError
          }
        );
      }
    },
    [createSalary, updateSalary, salaryId, salaryUser, enqueueSnackbar, tInvoices]
  );

  const {
    loading: loadingUserDetails,
    error,
    data
  } = useQuery<SalaryViewUserDetailsQueryType>(SalaryViewUserDetailsQuery, {
    variables: {
      where: { id: salaryUser.id }
    }
  });

  const onRejectDeductions = useCallback(
    (ids: number[]) => {
      updateDeductions(ids, DeductionStatusEnum.DECLINED);
    },
    [updateDeductions]
  );

  if (loadingUserDetails || loadingSalariesData) return <div className="loading" />;

  const user = data!.user!;

  const errors = [];

  if (!user.taxInfo?.personId) {
    errors.push('No CVR number supplied');
  }
  if (!user.taxInfo?.taxCard) {
    errors.push('A tax card has not been selected');
  }
  if (!user.bankAccount?.bankAccount || !user.bankAccount?.bankRegistration) {
    errors.push('No bank details supplied');
  }

  if (
    salaryUser.invoices?.find((x) => !x.paidAmountDkk && x.status !== InvoiceStatusEnum.APPROVED_BY_COMPANY)
  ) {
    errors.push('Not all invoices have a paid amount recorded');
  }

  return (
    <div className="salary-details">
      <h2>{tUsers('headers.details')}</h2>
      {salariesDataError && (
        <div className="alert alert-danger">
          <div className="fw-bold">Error retrieving previous salary details</div> {salariesDataError.message}
        </div>
      )}
      <SalaryUserDetailsCard user={user} />
      {error && <div className="alert alert-danger">{error.message}</div>}
      <h2>{tInvoices('headers.details')}</h2>
      <SalaryInvoiceDetailsCard invoices={salaryUser?.invoices ?? []} holidayPayment={user.vacationPayment} />
      <DeductionList
        userId={salaryUser.id}
        onApproveDeductions={addDeductionsToSalary}
        onRejectDeductions={onRejectDeductions}
      />
      {errors.length > 0 && (
        <div className="alert alert-danger mt-3">
          This salary can not yet be paid as there are the following errors:
          <ul className="mt-1 mb-1">
            {errors.map((validationError) => (
              <li>{validationError}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="card mt-3">
        <div className="card-footer border-0">
          <div className="actions float-end">
            <SubmitButton
              icon={<i className="uil uil-money-stack" />}
              title={t('buttons.sendToZenegy')}
              saving={updating}
              disabled={errors.length > 0}
              onClick={sendToZenegy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

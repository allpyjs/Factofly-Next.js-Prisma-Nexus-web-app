import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import CustomerDetailsQuery from './graphql/CustomerDetailsQuery.gql';
import { CustomerDetailsQuery as CustomerDetailsQueryType } from './graphql/.generated/CustomerDetailsQuery';
import PageError from '~/features/shared/components/PageError';
import TopActions from '~/features/shared/components/TopActions';
import ButtonLink from '~/features/shared/components/ButtonLink';
import CustomerTypeBadge from '../CustomerTypeBadge';
import CustomerCard from './CustomerCard';
import DeleteButton from '~/features/shared/components/DeleteButton';
import useDeleteCustomer from '../../hooks/useDeleteCustomers/useDeleteCustomer';

function CustomerDetails(): JSX.Element {
  const { push, query } = useRouter();
  const { id } = query;
  const { t } = useTranslation('common');

  const { deleteCustomer } = useDeleteCustomer({
    onCompleted: () => {
      push(`/customers`);
    }
  });

  const { loading, error, data } = useQuery<CustomerDetailsQueryType>(CustomerDetailsQuery, {
    variables: {
      where: { id }
    }
  });

  if (loading) return <div className="loading" />;

  const customer = data?.customer;

  return (
    <div>
      <div className="header row">
        <TopActions>
          <ButtonLink
            icon="uil-invoice"
            title={t('buttons.invoices.create')}
            href={encodeURI(`/invoices/new?task&customer_id=${id}`)}
          />
          <ButtonLink
            icon="uil-calender"
            title={t('buttons.tasks.create')}
            href={encodeURI(`/tasks/new?task&customer_id=${id}`)}
          />
          <ButtonLink icon="uil-pen" title={t('buttons.customers.edit')} href={`/customers/${id}/edit`} />
          <DeleteButton onConfirm={() => deleteCustomer(Number(id))} />
        </TopActions>
        <h1 className="page-title">
          {data?.customer?.name} <CustomerTypeBadge type={customer?.type!} className="badge-sm" />
        </h1>
      </div>
      <CustomerCard customer={customer!} />
      {error && <PageError message={error.message} />}
    </div>
  );
}

export default CustomerDetails;

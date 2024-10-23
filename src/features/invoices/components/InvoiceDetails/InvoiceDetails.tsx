import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import InvoiceDetailsQuery from './graphql/InvoiceDetailsQuery.gql';
import { InvoiceDetailsQuery as InvoiceDetailsQueryType } from './graphql/.generated/InvoiceDetailsQuery';
import PageError from '~/features/shared/components/PageError';
import TopActions from '../../../shared/components/TopActions';
import ButtonLink from '~/features/shared/components/ButtonLink';
import InvoiceDetailsCard from './InvoiceDetailsCard';
import InvoiceDetailsLines from './InvoiceDetailsLines';
import EditButton from '~/features/shared/components/EditButton';
import { InvoiceStatusEnum, RecordTypeEnum } from '~/.generated/globalTypes';
import useUser from '~/contexts/User/useUser';
import AuditCard from '~/features/audits/components/AuditCard';
import InvoiceStatusButtons from '../InvoiceStatusButtons';
import ServiceLogCard from '~/features/services/components/ServiceLogCard';

type InvoiceDetailsProps = {
  id?: number;
  showAudits?: boolean;
  showServiceLogs?: boolean;
};

function InvoiceDetails({ id, showAudits = true, showServiceLogs = true }: InvoiceDetailsProps): JSX.Element {
  const { isAdmin } = useUser();
  const router = useRouter();
  const { id: routeId } = router.query;
  const { t } = useTranslation('invoices');

  const { loading, error, data } = useQuery<InvoiceDetailsQueryType>(InvoiceDetailsQuery, {
    variables: {
      where: { id: id ?? routeId }
    }
  });

  if (loading) return <div className="loading" />;

  const invoice = data?.invoice;

  return (
    <div>
      <div className="header">
        <TopActions>
          <ButtonLink
            icon="uil-invoice"
            title={t('buttons.copy')}
            href={encodeURI(`/invoices/new?invoice&copy_invoice_id=${invoice?.id}`)}
          />
          {(invoice?.status === InvoiceStatusEnum.DRAFT || isAdmin) && (
            <EditButton href={`/invoices/${invoice?.id}/edit`} className="" />
          )}
          <InvoiceStatusButtons invoiceId={invoice!.id} invoiceStatus={invoice!.status} />
        </TopActions>
        <h1 className="page-title">Reference: {data?.invoice?.reference}</h1>
      </div>
      {invoice && <InvoiceDetailsCard invoice={invoice!} />}
      {isAdmin && showServiceLogs && (
        <ServiceLogCard recordId={invoice!.id} recordType={RecordTypeEnum.INVOICE} />
      )}
      {isAdmin && showAudits && <AuditCard recordId={invoice!.id} recordType={RecordTypeEnum.INVOICE} />}
      <div className="card">
        <div className="card-body">
          <InvoiceDetailsLines
            currency={invoice?.currency!}
            includeVat={invoice?.includeVat ?? false}
            lines={invoice?.lines!}
          />
        </div>
      </div>
      {error && <PageError message={error.message} />}
    </div>
  );
}

export default InvoiceDetails;

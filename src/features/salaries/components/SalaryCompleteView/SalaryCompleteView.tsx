import { useTranslation } from 'next-i18next';
import { useQuery } from '@apollo/client';
import { toDateString } from '~/utils/formatDate';
import SalaryCompleteViewQuery from './graphql/SalaryCompleteViewQuery.gql';
import { SalaryCompleteViewQuery as SalaryCompleteViewQueryType } from './graphql/.generated/SalaryCompleteViewQuery';
import DeductionStatusBadge from '~/features/deductions/components/DeductionStatusBadge';
import PrintButton from '~/features/shared/components/PrintButton';
import useUser from '~/contexts/User/useUser';
import ServiceLogCard from '~/features/services/components/ServiceLogCard';
import { RecordTypeEnum, SalaryStatusEnum } from '~/.generated/globalTypes';
import DownloadPayslipButton from '../DownloadPayslipButton';
import DownloadFeeInvoiceButton from '../DownloadFeeInvoiceButton';
import SalaryInvoiceDetailsCard from '../SalaryInvoiceDetailsCard';
import SalaryUserDetailsCard from '../SalaryUserDetailsCard';
import AuditCard from '~/features/audits/components/AuditCard';
import SalaryPaidButton from '../SalaryPaidButton';
import FetchPayrollButton from '../FetchPayrollButton';

type SalaryCompleteDetailsProps = {
  salaryId: number;
  showServiceLogs?: boolean;
  showUserDetails?: boolean;
};

export default function SalaryCompleteView({
  salaryId,
  showServiceLogs = false,
  showUserDetails = false
}: SalaryCompleteDetailsProps) {
  const { t: tInvoices } = useTranslation('invoices');
  const { t: tDeductions } = useTranslation('deductions');
  const { isAdmin } = useUser();

  const { data, loading, error } = useQuery<SalaryCompleteViewQueryType>(SalaryCompleteViewQuery, {
    variables: { where: { id: salaryId } }
  });

  if (loading) {
    return <div className="loading" />;
  }
  if (error) {
    return <div className="alert alert-danger">{error.message}</div>;
  }
  const salary = data!.salary!;
  const user = salary!.user!;

  const salaryComplete = salary.feeInvoiceUrl && salary.payslipUrl;

  return (
    <div className="salary-details">
      {isAdmin && showUserDetails && <SalaryUserDetailsCard user={user} />}
      {isAdmin && showServiceLogs && (
        <ServiceLogCard recordId={salaryId} recordType={RecordTypeEnum.SALARY} />
      )}
      {isAdmin && <AuditCard recordId={salaryId} recordType={RecordTypeEnum.SALARY} />}
      <h2>{tInvoices('headers.details')}</h2>
      <SalaryInvoiceDetailsCard invoices={salary.invoices ?? []} holidayPayment={user.vacationPayment} />
      {salary.deductions && salary.deductions.length > 0 ? (
        <>
          <h2>{tDeductions('headers.details')}</h2>
          {salary.deductions.map((deduction) => (
            <div className="card deductions-card mb-1">
              <div className="card-body py-1">
                <div className="deductions">
                  {isAdmin && <span className="badge bg-danger me-1">{`${deduction.id}`}</span>}
                  <span className="deduction-date fs-5 text-muted">
                    <i className="uil uil-calender" /> {toDateString(deduction.createdDate)}
                  </span>
                  <span className="fw-bold text-muted mb-1">{deduction.description}</span>
                  <DeductionStatusBadge className="float-end ms-1" status={deduction?.status} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="alert alert-success text-muted">{tDeductions('messages.noSalaryDeductions')}</div>
      )}
      <div className="card mt-3 d-print-none">
        <div className="card-footer border-0">
          <div className="actions float-end">
            {salary.feeInvoiceUrl && <DownloadFeeInvoiceButton url={salary.feeInvoiceUrl} />}
            {salary.payslipUrl && <DownloadPayslipButton url={salary.payslipUrl} />}
            <PrintButton />
            {salary.status === SalaryStatusEnum.SENT && <FetchPayrollButton salaryId={salary.id} />}
            {salary.status === SalaryStatusEnum.SENT && (
              <SalaryPaidButton disabled={!salaryComplete} salaryId={salary.id} />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .invoices .invoice-date,
        .deductions .deduction-date {
          display: inline-block;
          width: 110px;
        }
        @media print {
          :global(.content) {
            padding: 0 !important;
          }
          :global(.badge) {
            border: 1px solid #eee;
          }
          :global(.card-body),
          :global(.card-header) {
            padding: 1rem;
          }
          :global(.card) {
            border: 1px solid #eee;
            box-shadow: none;
          }
          :global(a) {
            color: black;
          }
        }
      `}</style>
    </div>
  );
}

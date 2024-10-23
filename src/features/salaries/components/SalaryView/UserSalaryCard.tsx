import classNames from 'classnames';
import Link from 'next/link';
import formatCurrency from '~/utils/formatCurrency';
import { toDateString } from '~/utils/formatDate';
import InvoiceStatusBadge from '~/features/invoices/components/InvoiceStatusBadge';
import { SalaryViewQuery_items_edges_node as InvoiceType } from './graphql/.generated/SalaryViewQuery';

type UserSalaryCardProps = {
  date: string;
  user: { id: number; displayName?: string; invoices?: InvoiceType[] };
  selected?: boolean;
  onClick: (id: number, date: string) => void;
};

function UserSalaryCard({ user, date, onClick, selected = false }: UserSalaryCardProps): JSX.Element {
  const invoices = user.invoices?.map((invoice) => (
    <div key={invoice.id} className="invoices">
      <Link href={`/invoices/${invoice.id}`} target="_blank">
        <a>
          <span className="badge bg-danger me-1">{`${invoice.visibleId}/${invoice.id}`}</span>
        </a>
      </Link>
      <span className="invoice-date fs-5 text-muted">
        <i className="uil uil-calender" /> {toDateString(invoice.invoiceDate)}
      </span>
      <span className="invoice-total">
        {formatCurrency(invoice.totalPriceWithVat, 'dk', invoice.currency)}
      </span>
      <InvoiceStatusBadge className="float-end ms-1" status={invoice?.status} />
      <style jsx>{`
        .invoices .invoice-date {
          display: inline-block;
          width: 110px;
        }
        .invoices .invoice-total {
          display: inline-block;
          text-align: right;
          width: 140px;
        }
      `}</style>
    </div>
  ));

  return (
    <div
      className={classNames('card mb-2', { selected })}
      role="button"
      tabIndex={0}
      onClick={() => onClick(user.id, date)}
      onKeyDown={() => onClick(user.id, date)}
    >
      <div className="card-header p-1 fs-6">
        <Link href={`/admin/users/${user.id}`} target="_blank">
          <a>
            <span className="badge bg-dark me-1">{`${user.id}`}</span>
          </a>
        </Link>
        {user.displayName}
      </div>

      <div className="card-body p-1">
        <div className="fw-bold fs-4">{invoices}</div>
      </div>

      <style jsx>{`
        i {
          margin-right: 3px;
        }
        .card-header :global(.badge) {
          font-size: 0.6rem;
          padding: 4px 3px;
          margin-top: 1px;
        }
        .card {
          border-right: 4px solid white;
        }
        .card:hover {
          border-right: 4px solid #eee;
        }
        .card.selected {
          border-right: 4px solid #d73a3a;
        }
      `}</style>
    </div>
  );
}

export default UserSalaryCard;

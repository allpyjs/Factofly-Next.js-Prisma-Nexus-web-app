/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLazyQuery } from '@apollo/client';
import { Fragment, useCallback, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { RecordType } from '@prisma/client';
import AuditCardQuery from './graphql/AuditCardQuery.gql';
import { AuditCardQuery as AuditCardQueryType } from './graphql/.generated/AuditCardQuery';
import { toDateTimeString } from '~/utils/formatDate';
import FormSection from '~/features/forms/components/FormSection';
import FormSectionContent from '~/features/forms/components/FormSectionContent';
import uniqueFilter from '~/utils/uniqueFilter';
import SidebarSection from '~/features/shared/components/SidebarSection';

type AuditCardProps = {
  recordType: string;
  recordId: number | bigint;
};
type OpenedRowState = {
  [key: number]: boolean;
};

const translationMap: { [key: string]: string } = {
  [RecordType.INVOICE]: 'invoices',
  [RecordType.TASK]: 'tasks',
  [RecordType.DEDUCTION]: 'deductions',
  [RecordType.SALARY]: 'salaries'
};

export default function AuditCard({ recordId, recordType }: AuditCardProps) {
  const { t } = useTranslation(translationMap[recordType]);

  const [openedRows, setOpenedRows] = useState<OpenedRowState>({});

  const toggleRow = useCallback((id: number) => {
    setOpenedRows((state) => ({
      ...state,
      [id]: !state[id]
    }));
  }, []);

  const [loadAudits, { data, loading, error }] = useLazyQuery<AuditCardQueryType>(AuditCardQuery, {
    variables: {
      first: 20,
      where: {
        recordId: {
          equals: Number(recordId)
        },
        recordType: {
          equals: recordType
        }
      },
      orderBy: {
        createdDate: 'desc'
      }
    }
  });

  // if (loading) return <div className="loading" />;

  const audits = data?.audits.nodes;

  const formatData = (event: string, value: any, updatedValue: any) => {
    const keys = value
      ? Object.keys(value ?? {})
          .concat(Object.keys(updatedValue ?? {}))
          .filter(uniqueFilter)
      : [];

    return keys
      .map((key: string) => {
        const valueChanged = updatedValue && updatedValue[key] && value[key] !== updatedValue[key];

        if (
          (value && value[key] !== null && typeof value[key] === 'object') ||
          (updatedValue && updatedValue[key] !== null && typeof updatedValue[key] === 'object')
        ) {
          const childValue = value && value[key] ? value[key] : null;
          const childUpdatedValue = updatedValue && updatedValue[key] ? updatedValue[key] : null;

          return (
            <li>
              <span className="fw-bold">{key}:</span>
              <ul className="changes-nested list-unstyled m-1 mx-3 ps-2">
                {formatData(event, childValue, childUpdatedValue)}
              </ul>
            </li>
          );
        }

        return (
          <li key={key} className={classNames({ 'text-success': valueChanged })}>
            <span className="fw-bold">{key}:</span>
            &nbsp;
            {JSON.stringify(value[key])}
            {valueChanged && (
              <span className="fw-bold">
                <i className="uil-arrow-right" /> {JSON.stringify(updatedValue[key])}
              </span>
            )}
          </li>
        );
      })
      .filter((x) => !!x);
  };

  const rows = audits?.map((x) => {
    const value = x.value ? JSON.parse(x.value) : null;
    const updatedValue = x.updatedValue ? JSON.parse(x.updatedValue) : null;

    const displayValue = updatedValue ?? value;
    const cleanData = (dataToClean: string) => dataToClean.replace('---\n', '');
    const isOpen = !!openedRows[x.id];
    const { status } = displayValue;

    return (
      <Fragment key={x.id}>
        <tr key={x.id}>
          <td>{toDateTimeString(x.createdDate)}</td>
          <td>{x.event}</td>
          <td>{x?.user?.displayName}</td>
          <td>{status && t(`statuses.${status}`)}</td>
          <td>
            <button type="button" className="btn btn-light btn-sm float-end" onClick={() => toggleRow(x.id)}>
              <i
                className={classNames({
                  'uil-angle-down': !isOpen,
                  'uil-angle-up': isOpen
                })}
              />
            </button>
          </td>
        </tr>
        {isOpen && (
          <tr key={`${x.id}-details`}>
            <td colSpan={999}>
              {displayValue?.data ? (
                <pre>{cleanData(displayValue?.data)}</pre>
              ) : (
                <ul className="changes list-unstyled">{formatData(x.event!, value, updatedValue)}</ul>
              )}
            </td>
          </tr>
        )}
      </Fragment>
    );
  });

  return (
    <SidebarSection icon="uil-user-hard-hat" top={180} onOpen={loadAudits}>
      <div className="card audit-card">
        <div className="card-body p-2 py-0">
          <FormSection>
            <h3>Audits</h3>
            <FormSectionContent>
              {error && (
                <div className="alert alert-danger">There was an error retrieving the audit records</div>
              )}
              {loading && <div>Loading...</div>}
              {!loading && (
                <div className="table-wrapper">
                  <table className="table table-centered table-compact mb-0">
                    <thead className="table-dark sticky-top">
                      <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>User</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </table>
                </div>
              )}
            </FormSectionContent>
          </FormSection>
        </div>
      </div>
      <style jsx>{`
        .audit-bar {
          position: fixed;
          top: 100;
          z-index: 1000;
          right: 0;
        }

        .table.table-compact th,
        .table.table-compact :global(td) {
          padding: 0.3rem;
          border-bottom-width: 0;
        }
        .table :global(.sticky-top) {
          z-index: 0;
        }
        .table :global(ul.changes) {
          border: 1px solid #eee;
          border-radius: 3px;
          padding: 0.5rem;
        }
        .table :global(ul.changes-nested) {
          border-left: 2px solid #eee;
        }
      `}</style>
    </SidebarSection>
  );
}

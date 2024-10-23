/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLazyQuery } from '@apollo/client';
import { Fragment } from 'react';
import ServiceLogCardQuery from './graphql/ServiceLogCardQuery.gql';
import { ServiceLogCardQuery as ServiceLogCardQueryType } from './graphql/.generated/ServiceLogCardQuery';
import { toDateTimeString } from '~/utils/formatDate';
import FormSection from '~/features/forms/components/FormSection';
import FormSectionContent from '~/features/forms/components/FormSectionContent';
import SidebarSection from '~/features/shared/components/SidebarSection';

type ServiceLogCardProps = {
  recordType: string;
  recordId: number | bigint;
};

export default function ServiceLogCard({ recordId, recordType }: ServiceLogCardProps) {
  const [loadLogs, { data, loading, error }] = useLazyQuery<ServiceLogCardQueryType>(ServiceLogCardQuery, {
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

  const serviceLogs = data?.serviceLogs.nodes;

  const rows = serviceLogs?.map((x) => (
    <Fragment key={x.id}>
      <tr key={x.id}>
        <td>{toDateTimeString(x.createdDate)}</td>
        <td>{x.service}</td>
        <td>
          <span className={`badge ${x.status === 'SUCCESS' ? 'bg-success' : 'bg-danger'}`}>
            {x.status?.toLowerCase()}
          </span>
        </td>
        <td>{x.message}</td>
      </tr>
    </Fragment>
  ));

  return (
    <SidebarSection top={140} icon="uil-cloud-upload" onOpen={loadLogs}>
      <div className="card serviceLog-card">
        <div className="card-body p-2 py-0">
          <FormSection>
            <h3>Service Logs</h3>
            <FormSectionContent>
              {error && (
                <div className="alert alert-danger">
                  There was an error retrieving the service log records
                </div>
              )}
              {loading && <div>Loading...</div>}
              {!loading && (
                <div className="table-wrapper">
                  <table className="table table-centered table-compact mb-0">
                    <thead className="table-dark sticky-top">
                      <tr>
                        <th>Date</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </table>
                </div>
              )}
            </FormSectionContent>
          </FormSection>
        </div>
        <style jsx>{`
          .table.table-compact th,
          .table.table-compact :global(td) {
            padding: 0.3rem;
            border-bottom-width: 0;
          }
          .table :global(.sticky-top) {
            z-index: 0;
          }
        `}</style>
      </div>
    </SidebarSection>
  );
}

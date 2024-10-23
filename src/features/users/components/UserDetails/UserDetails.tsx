import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import UserDetailsQuery from './graphql/UserDetailsQuery.gql';
import { UserDetailsQuery as UserDetailsQueryType } from './graphql/.generated/UserDetailsQuery';
import PageError from '~/features/shared/components/PageError';
import TopActions from '~/features/shared/components/TopActions';
import ButtonLink from '~/features/shared/components/ButtonLink';
// import UserTypeBadge from '../UserTypeBadge';
import UserDetailsCard from './UserDetailsCard';
import useUser from '~/contexts/User/useUser';
import AuditCard from '~/features/audits/components/AuditCard';
import { RecordTypeEnum } from '~/.generated/globalTypes';
import ServiceLogCard from '~/features/services/components/ServiceLogCard';
// import DeleteButton from '~/features/shared/components/DeleteButton';
// import useDeleteUser from '../../hooks/useDeleteUsers/useDeleteUser';

function UserDetails(): JSX.Element {
  const { query } = useRouter();
  const { impersonateUser } = useUser();
  const { id } = query;

  const { t } = useTranslation('users');
  const { t: tc } = useTranslation('common');
  const { loading, error, data } = useQuery<UserDetailsQueryType>(UserDetailsQuery, {
    variables: {
      where: { id }
    }
  });

  if (loading) return <div className="loading" />;

  const user = data?.user;

  return (
    <div>
      <div className="header row">
        <TopActions>
          <ButtonLink
            icon="uil-invoice"
            title={tc('buttons.invoices.create')}
            href={encodeURI(`/invoices/new?task&user_id=${id}`)}
          />
          <ButtonLink
            icon="uil-calender"
            title={tc('buttons.tasks.create')}
            href={encodeURI(`/tasks/new?task&user_id=${id}`)}
          />
          <ButtonLink icon="uil-pen" title={tc('buttons.users.edit')} href={`/admin/users/${id}/edit`} />
          <button
            className="btn btn-warning"
            type="button"
            style={{ width: 200 }}
            onClick={() => {
              impersonateUser!(Number(id));
            }}
          >
            <i className="uil-constructor me-0" /> {t('buttons.impersonate')}
          </button>
          {/* <DeleteButton onConfirm={() => deleteUser(Number(id))} /> */}
        </TopActions>
        <h1 className="page-title">{data?.user?.displayName}</h1>
      </div>
      <AuditCard recordId={user!.id} recordType={RecordTypeEnum.USER} />
      <ServiceLogCard recordId={user!.id} recordType={RecordTypeEnum.USER} />
      <UserDetailsCard user={user!} />
      {error && <PageError message={error.message} />}
    </div>
  );
}

export default UserDetails;

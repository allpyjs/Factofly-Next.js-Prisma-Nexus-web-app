import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import useUser from '~/contexts/User/useUser';
import CustomerTypeBadge from '~/features/customers/components/CustomerTypeBadge';
import SectionHeader from '~/features/forms/components/SectionHeader';
import CardHeaderIcon from '~/features/shared/components/CardHeaderIcon';
import CardItem from '~/features/shared/components/CardItem';
import DetailsCardSection from '~/features/shared/components/DetailsCardSection';
import formatCurrency from '~/utils/formatCurrency';
import { toDateString } from '~/utils/formatDate';
import TaskStatusBadge from '../TaskStatusBadge';
import { TaskDetailsQuery_task as TaskType } from './graphql/.generated/TaskDetailsQuery';

type DetailsCardProps = {
  task: TaskType;
};

function TaskCard({ task }: DetailsCardProps): JSX.Element {
  const { isAdmin } = useUser();
  const { t } = useTranslation('tasks');

  return (
    <>
      <div className="card">
        <div className="card-header p-0 pe-2">
          <TaskStatusBadge className="float-end my-2" status={task?.status} />
          <h3 className="m-0">
            <CardHeaderIcon icon="uil-clipboard-notes" /> {task.title}
          </h3>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col">
              <DetailsCardSection>
                <SectionHeader title={t('headers.taskInformation')} />
                {isAdmin && (
                  <CardItem
                    label={t('labels.user')}
                    value={
                      <Link href={`/admin/users/${task?.user.id}`}>
                        <a>
                          {task?.user.displayName}
                          <span className="badge bg-light text-dark ms-1">id: {task?.user.id}</span>
                        </a>
                      </Link>
                    }
                  />
                )}
                <div className="row">
                  <div className="col">
                    <CardItem label={t('labels.reference')} value={task?.reference} />
                    <CardItem label={t('labels.jobType')} value={task?.jobType.name_en} />
                    {task?.paymentType && (
                      <CardItem
                        label={t('labels.paymentType')}
                        value={t(`taskPaymentTypes.${task?.paymentType}`)}
                      />
                    )}
                    <CardItem label={t('labels.expectedHours')} value={task?.expectedHours} />
                  </div>
                  <div className="col">
                    <CardItem label={t('labels.startDate')} value={toDateString(task?.startDate)} />
                    <CardItem label={t('labels.endDate')} value={toDateString(task?.endDate)} />
                    <CardItem
                      label={t('labels.paymentAmount')}
                      value={task?.paymentAmount ? formatCurrency(task?.paymentAmount, 'da', 'dkk') : ''}
                    />
                  </div>
                </div>
              </DetailsCardSection>
            </div>
            <div className="col">
              <DetailsCardSection>
                <SectionHeader title={t('headers.customer')} />
                <CardItem
                  label={t('labels.customerName')}
                  value={
                    <>
                      <Link href={`/customers/${task.customer.id}`}>
                        <a>{task?.customer.name}</a>
                      </Link>
                      <CustomerTypeBadge className="ms-2" type={task?.customer.type} />
                      <span className="badge bg-light text-dark ms-1">id: {task?.customer.id}</span>
                    </>
                  }
                />
                <CardItem
                  label={t('labels.customerEmail')}
                  value={
                    <a href={`mailto:${task.customer.email}`} target="_blank" rel="noreferrer">
                      {task.customer.email}
                    </a>
                  }
                />

                <CardItem label={t('labels.customerAddress')} value={task?.customer.address.address} />
              </DetailsCardSection>
            </div>
          </div>
        </div>
      </div>
      {task?.description && (
        <div className="card">
          <div className="card-body">
            <DetailsCardSection>
              <SectionHeader title={t('labels.description')} />
              {task?.description.split('\n').map((line) => (
                <p>{line}</p>
              ))}
            </DetailsCardSection>
          </div>
        </div>
      )}
      <style jsx>{`
        i {
          margin-right: 3px;
        }
      `}</style>
    </>
  );
}

export default TaskCard;

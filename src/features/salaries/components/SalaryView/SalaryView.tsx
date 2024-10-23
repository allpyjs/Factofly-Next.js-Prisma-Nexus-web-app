import { useQuery } from '@apollo/client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { CSSTransition } from 'react-transition-group';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import Scrollbars from 'react-custom-scrollbars-2';
import { useRouter } from 'next/router';
import SalaryViewQuery from './graphql/SalaryViewQuery.gql';
import {
  SalaryViewQuery as SalaryViewQueryType,
  SalaryViewQuery_items_edges_node as InvoiceType
} from './graphql/.generated/SalaryViewQuery';
import { InvoiceStatusEnum, SalaryPaymentTypeEnum } from '~/.generated/globalTypes';
import SearchFilter from '~/features/tables/components/SearchFilter';
import { toDateString } from '~/utils/formatDate';
import UserSalaryCard from './UserSalaryCard';
import SalaryDetails from '../SalaryDetails';
import useWindowDimensions from '~/features/shared/hooks/useWindowDimensions';
import SalaryCompleteView from '../SalaryCompleteView';

type SalaryViewProps = {};
type SalaryData = {
  [key: string]: {
    users: UserData;
  };
};
type UserData = {
  [key: number]: {
    id: number;
    paymentDate: Date;
    displayName?: string;
    invoices?: InvoiceType[];
  };
};

const getSalaryDueDate = ({
  earlyPayment,
  status,
  user: { salaryPaymentType, salaryPaymentDay }
}: any): Date | null => {
  if (salaryPaymentType === SalaryPaymentTypeEnum.VIA_INVOICE) return null;

  if (
    status === InvoiceStatusEnum.APPROVED_BY_COMPANY &&
    (salaryPaymentType === SalaryPaymentTypeEnum.EARLY || earlyPayment)
  ) {
    return new Date();
  }
  if (status === InvoiceStatusEnum.PAID) {
    if (salaryPaymentType === null || salaryPaymentType === SalaryPaymentTypeEnum.ON_PAYMENT) {
      return new Date();
    }
    if (salaryPaymentType === SalaryPaymentTypeEnum.TIMED) {
      let paymentDay = salaryPaymentDay!;
      const lastDay = lastDayOfMonth(new Date()).getDate();
      const today = new Date().getDate();
      if (paymentDay < today) {
        paymentDay = today;
      } else if (paymentDay > lastDay) {
        paymentDay = lastDay;
      }
      return new Date(new Date().setDate(paymentDay));
    }
  }
  return null;
};

// eslint-disable-next-line no-empty-pattern
export default function SalaryView({}: SalaryViewProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { t: tUsers } = useTranslation('users');
  const [query, setQuery] = useState('');
  const { height } = useWindowDimensions();
  const [pageSize, setPageSize] = useState(100); // TODO: Filter these better on the server

  const loadMore = useCallback(() => {
    setPageSize((x) => x + 10);
  }, [setPageSize]);

  let selected: { userId: number; date: string } | undefined;
  let salaryId: number | undefined;
  if (router.query.userId && router.query.date) {
    selected = {
      userId: Number.parseInt(router.query.userId as string, 10),
      date: router.query.date as string
    };
  } else if (router.query.salaryId) {
    salaryId = Number.parseInt(router.query.salaryId as string, 10);
  }

  const queryVariables = useMemo(
    () => ({
      first: pageSize,
      where: {
        user: undefined,
        active: { equals: true },
        query,
        status: { in: [InvoiceStatusEnum.PAID, InvoiceStatusEnum.APPROVED_BY_COMPANY] },
        salaryId: { equals: null },
        invoiceDate: { gt: '2022-01-01' }
      },
      orderBy: { id: 'desc' }
    }),
    [pageSize, query]
  );

  const { data, loading, refetch } = useQuery<SalaryViewQueryType>(SalaryViewQuery, {
    variables: queryVariables
  });

  useEffect(() => {
    refetch(queryVariables);
  }, [refetch, queryVariables]);

  const salaries = useMemo(() => {
    const invoices = data?.items.edges
      .map((edge) => ({
        ...edge.node,
        salaryDueDate: getSalaryDueDate(edge.node)
      }))
      .filter((invoice) => !!invoice.salaryDueDate)
      .sort(
        (a, b) =>
          (a.salaryDueDate ? a.salaryDueDate.getDate() : 0) -
          (b.salaryDueDate ? b.salaryDueDate.getDate() : 0)
      );

    const salaryData: SalaryData = {};

    invoices?.forEach((invoice) => {
      if (invoice.salaryDueDate) {
        const dueDate = toDateString(invoice.salaryDueDate);
        if (!salaryData[dueDate]) {
          salaryData[dueDate] = { users: [] };
        }

        if (!salaryData[dueDate].users[invoice.user.id]) {
          salaryData[dueDate].users[invoice.user.id] = {
            id: invoice.user.id,
            paymentDate: invoice.salaryDueDate,
            displayName: invoice.user.displayName,
            invoices: [invoice]
          };
        } else {
          salaryData[dueDate].users[invoice.user.id].invoices?.push(invoice);
        }
      }
    });

    return salaryData;
  }, [data]);

  let selectedSalary =
    selected && salaries[selected.date] ? salaries[selected.date].users[selected.userId] : null;
  if (selected && !selectedSalary) {
    selectedSalary = {
      id: selected.userId,
      paymentDate: new Date(selected.date)
    };
  }

  return (
    <div>
      <div className="row">
        <div className="col-4 d-print-none">
          <h1>{t('menu.salary')}</h1>
          <SearchFilter className="mb-2" value={query} onChange={setQuery} />
          <Scrollbars style={{ height: height - 300 }}>
            {loading && (
              <CSSTransition in={loading} timeout={300} classNames="list-loader" key="loader">
                <div className="table-loader progress rounded-0 mb-2">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                    style={{ width: '100%' }}
                  />
                </div>
              </CSSTransition>
            )}
            {Object.keys(salaries).map((date) => (
              <div className="pe-2">
                <div className="fs-4 fw-bold">{date}</div>
                {Object.keys(salaries[date].users).map((userId) => {
                  const user = salaries[date].users[Number(userId)];
                  return (
                    <UserSalaryCard
                      user={user}
                      date={date}
                      selected={selected?.date === date && selected?.userId === user.id}
                      onClick={() => {
                        router.push(`/admin/salaries?userId=${user.id}&date=${date}`);
                      }}
                    />
                  );
                })}
              </div>
            ))}
            {Object.keys(salaries)?.length === 0 && <div className="fs-4">{t('messages.noEntries')}</div>}
            {!!data?.items?.totalCount && data?.items?.totalCount > pageSize && (
              <button
                type="button"
                className="btn btn-light btn-sm float-end mb-2"
                onClick={() => loadMore()}
              >
                {t('buttons.loadMore')}
              </button>
            )}
          </Scrollbars>
        </div>
        <div className="col">
          {selectedSalary && (
            <div>
              <h1>{t('headers.details')}</h1>
              <SalaryDetails user={selectedSalary} />
            </div>
          )}
          {salaryId && (
            <div>
              <h1>{t('headers.details')}</h1>
              <SalaryCompleteView salaryId={salaryId} showServiceLogs showUserDetails />
            </div>
          )}
          {!selected && !salaryId && (
            <div>
              <div className="fs-1 fw-bold mt-1">{tUsers('messages.noneSelected')}</div>
              <p className="fs-4">{tUsers('messages.pleaseSelectUser')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

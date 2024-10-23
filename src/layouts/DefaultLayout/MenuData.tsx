import { LOGOUT_PAGE } from '~/constants/appRoutes';
import AvailableCreditBadge from '~/features/rewards/components/AvailableCreditBadge';
import { PageItem } from './PageItem';

export const pages: PageItem[] = [
  {
    title: 'overview',
    href: '/',
    icon: <i className="uil-signal-alt-3" />,
    matches: /^\//
  },
  {
    title: 'invoices',
    href: '/invoices',
    icon: <i className="uil-invoice" />,
    matches: /^\/invoice/
  },

  {
    title: 'customers',
    href: '/customers',
    matches: /^\/customer.*/,
    icon: <i className="uil-building" />
  },
  {
    title: 'tasks',
    href: '/tasks',
    matches: /^\/task.*/,
    icon: <i className="uil-calender" />
  },
  {
    title: 'deductions',
    href: '/deductions',
    matches: /^\/deduction.*/,
    icon: <i className="uil-bill" />
  },
  {
    title: 'cooperationAgreements',
    href: '/cooperations',
    matches: /^\/cooperations.*/,
    icon: <i className="mdi mdi-handshake-outline" />
  },
  {
    title: 'salary',
    href: '/salaries',
    icon: <i className="uil-money-stack" />,
    matches: /^\/salaries.*/,
    featureFlag: 'feature-user-salaries'
  }
];

export const admin: PageItem[] = [
  {
    title: 'reports',
    href: '/admin/reports',
    matches: /^\/admin\/reports.*/,
    icon: <i className="uil-chart" />
  },

  {
    title: 'users',
    href: '/admin/users',
    matches: /^\/user.*/,
    icon: <i className="uil-user" />
  },

  {
    title: 'referral',
    href: '/admin/referrals',
    matches: /^\/referrals.*/,
    icon: <i className="uil-users-alt" />
  },

  {
    title: 'invoices',
    href: '/admin/invoices',
    icon: <i className="uil-invoice" />,
    matches: /^\/invoice.*/
  },
  {
    title: 'salary',
    href: '/admin/salaries',
    icon: <i className="uil-money-stack" />,
    matches: /^\/salaries.*/
  },
  {
    title: 'paidSalaries',
    href: '/admin/salaries/paid',
    icon: <i className="uil-receipt-alt" />,
    matches: /^\/salaries\/paid.*/
  },
  {
    title: 'customers',
    href: '/admin/customers',
    matches: /^\/customer.*/,
    icon: <i className="uil-building" />
  },
  {
    title: 'tasks',
    href: '/admin/tasks',
    icon: <i className="uil-calender" />,
    matches: /^\/invoice.*/
  },
  {
    title: 'deductions',
    href: '/admin/deductions',
    matches: /^\/deduction.*/,
    icon: <i className="uil-bill" />
  },
  {
    title: 'cooperationAgreements',
    href: '/admin/cooperations',
    matches: /^\/cooperations.*/,
    icon: <i className="mdi mdi-handshake-outline" />
  },
  {
    title: 'debug',
    href: '/admin/debug',
    matches: /^\/debug.*/,
    icon: <i className="uil uil-bug" />
  }
];

export const ownPages: PageItem[] = [
  {
    title: 'settings',
    href: '/settings',
    icon: <i className="uil-cog" />
  }
];

export const referral = {
  title: 'referrals',
  href: '/referrals',
  icon: <i className="uil-share-alt" />,
  anchorClassName: 'text-warning',
  badge: <AvailableCreditBadge />
};

export const otherPages: PageItem[] = [
  {
    title: 'logOut',
    href: LOGOUT_PAGE,
    icon: <i className="uil-sign-out-alt" />
  }
];

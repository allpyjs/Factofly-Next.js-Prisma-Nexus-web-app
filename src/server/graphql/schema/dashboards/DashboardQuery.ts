import { queryField } from 'nexus';

export const DashboardQuery = queryField((t) => {
  t.field('dashboard', {
    type: 'Dashboard',
    resolve: () => ({})
  });
});

export default DashboardQuery;

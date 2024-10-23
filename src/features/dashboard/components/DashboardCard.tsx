import classNames from 'classnames';
import formatCurrency from '~/utils/formatCurrency';

type DashboardCardProps = {
  title: string;
  count: number;
  amount: number;
  badgeClassName: string;
};

function DashboardCard({ title, count, amount, badgeClassName }: DashboardCardProps) {
  return (
    <div className="card">
      <div className="card-body">
        <span className={classNames('badge rounded-pill mr-2', badgeClassName)}>{count}</span>
        {title}
        <h4 className="text-center">{formatCurrency(amount, 'da', 'dkk')}</h4>
      </div>
      <style jsx>{`
        .badge {
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

export default DashboardCard;

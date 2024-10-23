import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import DataTable from 'react-data-table-component';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import classNames from 'classnames';
import formatCurrency from '~/utils/formatCurrency';

const columns = [
  {
    name: 'Month',
    selector: (row: any) => row.month
  },
  {
    name: 'MAU',
    selector: (row: any) => row.mau
  },
  {
    name: 'New Invoices',
    selector: (row: any) => row.newInvoices
  },
  {
    name: 'Total Invoices',
    selector: (row: any) => row.totalInvoices
  },
  {
    name: 'Invoices Growth',
    selector: (row: any) => Math.round(row.invoiceMoMGrowth * 100) / 100
  },
  {
    name: 'New Users',
    selector: (row: any) => row.newUsers
  },
  {
    name: 'Total Users',
    selector: (row: any) => row.totalUsers
  },
  {
    name: 'User Growth',
    selector: (row: any) => Math.round(row.invoiceMoMGrowth * 100) / 100
  },
  {
    name: 'Revenue',
    selector: (row: any) => formatCurrency(row.revenue, 'da', 'dkk')
  }
];

export default function KpiReport() {
  const [data, setData] = useState<any[]>([]);
  const dateString = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch('/api/reports/kpi', { signal })
      .then((res) => res.json())
      .then((res) => {
        setData([...res.data]);
      });
    return () => {
      controller.abort();
    };
  }, []);

  const chartData = useMemo(() => [...data].reverse(), [data]);

  const getMaxValue = useCallback(
    (key: string, round: number = 50) => {
      let max = -1;

      data.forEach((item) => {
        if (item[key] > max) {
          max = Number(item[key]);
        }
      });
      const roundedMax = Math.ceil(max / round) * round;
      return roundedMax;
    },
    [data]
  );

  const thisMonth = data[0];
  const lastMonth = data[1];

  let revenueGrowth = thisMonth ? 100 - Math.round((lastMonth.revenue / thisMonth.revenue) * 100) : 0;
  if (Number.isNaN(revenueGrowth)) {
    revenueGrowth = 0;
  }

  const activationRate = thisMonth ? Math.round((thisMonth.mau / thisMonth.totalUsers) * 100) : 0;

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <div className="card chart-card">
            <div className="card-body">
              <h2>MAU</h2>
              <ResponsiveContainer width="100%" aspect={2}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d65d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2d65d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="mau" stroke="blue" fillOpacity={1} fill="url(#colorUv)" />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, getMaxValue('mau')]} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-3">
          {/* <div className="card">
            <div className="card-body">
              <h2>Revenue</h2>
              <ResponsiveContainer width="100%" aspect={2}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d65d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2d65d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="blue"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, getMaxValue('revenue', 1000000)]} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div> */}
          <div className="card tilebox-one kpi-card">
            <div className="card-body">
              <i className="uil uil-users-alt float-end" />
              <h6 className="text-uppercase mt-0">Monthly Active Users (MAU)</h6>
              <h2 className="my-2" id="active-users-count">
                {thisMonth ? thisMonth.mau : 0}
              </h2>
              <p className="mb-0 text-muted">
                <span
                  className={classNames('me-2', {
                    'text-success': activationRate > 0,
                    'text-danger': activationRate < 0
                  })}
                >
                  <span
                    className={classNames('mdi ', {
                      'mdi-arrow-up-bold': activationRate > 0,
                      'mdi-arrow-right-bold': activationRate === 0,
                      'mdi-arrow-down-bold': activationRate < 0
                    })}
                  />{' '}
                  {thisMonth ? Math.round((thisMonth.mau / thisMonth.totalUsers) * 100) : 0}%
                </span>
                <span className="text-nowrap">Activation rate</span>
              </p>
            </div>
          </div>
          <div className="card tilebox-one kpi-card">
            <div className="card-body">
              <i className="uil uil-money-stack float-end" />
              <h6 className="text-uppercase mt-0">Gross Merchandise Value (GMV)</h6>
              <h2 className="my-2" id="active-users-count">
                {thisMonth ? formatCurrency(thisMonth.revenue, 'da', 'dkk') : 0}
              </h2>
              <p className="mb-0 text-muted">
                <span
                  className={classNames('me-2', {
                    'text-success': revenueGrowth > 0,
                    'text-danger': revenueGrowth < 0
                  })}
                >
                  <span
                    className={classNames('mdi ', {
                      'mdi-arrow-up-bold': revenueGrowth > 0,
                      'mdi-arrow-right-bold': revenueGrowth === 0,
                      'mdi-arrow-down-bold': revenueGrowth < 0
                    })}
                  />
                  {revenueGrowth}%
                </span>
                <span className="text-nowrap">Since last month</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card chart-card">
            <div className="card-body">
              <h2>Total / New Users</h2>
              <ResponsiveContainer width="100%" aspect={2}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d65d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2d65d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="green" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="totalUsers"
                    stroke="blue"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stroke="green"
                    fillOpacity={1}
                    fill="url(#colorGreen)"
                  />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, getMaxValue('totalUsers')]} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-body chart-card">
              <h2>Total / New Invoices</h2>
              <ResponsiveContainer width="100%" aspect={2}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d65d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2d65d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="green" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="totalInvoices"
                    stroke="blue"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="newInvoices"
                    stroke="green"
                    fillOpacity={1}
                    fill="url(#colorGreen)"
                  />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, getMaxValue('totalInvoices', 50)]} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <CSVLink
              data={data}
              title="test"
              className="btn btn-primary me-2"
              filename={`${dateString}-kpi-data`}
            >
              <i className="uil-file-download" /> KPI Data
            </CSVLink>
            <a className="btn btn-primary me-2" href="/api/reports/user-activity?format=csv" download>
              <i className="uil-file-download" /> User activity data
            </a>
            <a
              className="btn btn-primary me-2"
              href="/api/reports/user-activity?format=csv&amp;days_ago=14"
              download
            >
              <i className="uil-file-download" /> New registered users (14 days)
            </a>
            <a className="btn btn-primary me-2" href="/api/reports/user-invoice-totals?format=csv" download>
              <i className="uil-file-download" /> User invoice totals
            </a>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .chart-card {
          min-height: 310px;
        }
      `}</style>
    </div>
  );
}

import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from '@auth0/nextjs-auth0';
import { withSentry } from '@sentry/nextjs';
import prisma from '~/server/utils/prismaClient';
import logger from '~/utils/logger';
import { roles } from '~/server/graphql/schema/types';

export const config = {
  api: {
    bodyParser: false
  }
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

async function getKpiForDateRange(startDateString: string, endDateString: string) {
  const queryResult = await prisma.$queryRaw`
        select
            count(distinct u.id)::numeric as active_users,
            count(distinct i.id)::numeric as invoice_count,
            round(sum(i.subtotal_dkk)::numeric, 0 ) as invoice_total,
            round(round(sum(i.subtotal_dkk)::numeric, 0 ) / count(i.subtotal_dkk), 0 ) as average_invoice,
            (select count(id)::numeric from "user" where email not like '%@factofly.com' and email_verified = true and created_date >= cast(${startDateString} as date) and created_date < cast(${endDateString} as date)) as new_users,
            (select count(id)::numeric from "user" where email not like '%@factofly.com' and email_verified = true and created_date < cast(${endDateString} as date)) as total_users,
            (select count(id)::numeric from "invoice" where status not in ('DRAFT', 'CANCELLED') and created_date < cast(${endDateString} as date)) as total_invoices,
            (select count(distinct u1.id)::numeric from "user" u1 inner join "invoice" i1 on i1.user_id = u1.id and i1.status not in ('DRAFT', 'CANCELLED') where u1.email not like '%@factofly.com' and u1.email_verified = true) as total_activated_users,
            ${startDateString} as start_date,
            ${endDateString} as end_date

        from "user" u
        left outer join invoice i on i.user_id = u.id
        where
            i.status not in ('DRAFT', 'CANCELLED')
            and i.created_date >= cast(${startDateString} as date) and i.created_date < cast(${endDateString} as date)
            and u.email not like '%@factofly.com'
    `;
  const result = (queryResult as any[]).flat();
  return result;
}

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);

  logger.info(`pages/api/reports/kpi.ts: ${req.method} request started`);

  if (!session || session?.user === null) {
    res.status(403).send({ error: 'unauthorised' });
    return;
  }

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });

  if (!user || user.role !== roles.ADMIN) {
    res.status(403).send({ error: 'unauthorised' });
    return;
  }

  try {
    const startDate = new Date(new Date().toDateString());
    const startMonth = startDate.getMonth();

    const dates = [];
    for (let index = 0; index < 12; index += 1) {
      startDate.setMonth(startMonth - index);
      startDate.setHours(6);
      startDate.setDate(1);

      const endDate = new Date(startDate.toDateString());
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setHours(6);
      endDate.setDate(1);

      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];

      dates.push({ startDateString, endDateString });
    }

    const promises = dates.map(({ startDateString, endDateString }) =>
      getKpiForDateRange(startDateString, endDateString)
    );

    let results = await Promise.all(promises);
    results = results.flat();

    const data = [
      ...results.map((x: any) => ({
        startDate: x.start_date,
        endDate: x.end_date,
        month: `${months[new Date(x.start_date).getMonth()]}`,
        mau: Number(x.active_users ?? 0),
        newInvoices: Number(x.invoice_count ?? 0),
        totalInvoices: Number(x.total_invoices ?? 0),
        averageInvoiceAmount: Number(x.average_invoice ?? 0),
        revenue: Number(x.invoice_total ?? 0),
        newUsers: Number(x.new_users ?? 0),
        totalUsers: Number(x.total_users ?? 0),
        userMoMGrowth: 0,
        invoiceMoMGrowth: 0
      }))
    ];

    data.forEach((currentMonth, i) => {
      if (i < data.length - 1) {
        const lastMonth = data[i + 1];

        data[i].userMoMGrowth = currentMonth.newUsers / lastMonth.totalUsers;
        data[i].invoiceMoMGrowth = currentMonth.newInvoices / lastMonth.totalInvoices;
      }
    });

    res.status(200).json({ data });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: 'internal server error' });
  }
});

export default withSentry(apiRoute);

import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from '@auth0/nextjs-auth0';
import { withSentry } from '@sentry/nextjs';
import prisma from '~/server/utils/prismaClient';
import logger from '~/utils/logger';
import { roles } from '~/server/graphql/schema/types';
import toCSV from '~/utils/toCSV';

export const config = {
  api: {
    bodyParser: false
  }
};

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);

  logger.info(`pages/api/reports/user-invoice-totals.ts: ${req.method} request started`);

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
    let results: any[] = [];

    const monthResults: any[] = await prisma.$queryRaw`
      select
        extract(year from i.created_date) as invoice_year,
        extract(month from i.created_date) as invoice_month,
        concat(extract(year from i.created_date),'/',case when extract(month from i.created_date) < 10 then '0' else '' end, extract(month from i.created_date)) invoice_period
      from invoice i
      where i.created_date > '01 01 2022' and i.status not in ('DRAFT','CANCELLED')
      group by invoice_month, invoice_year, invoice_period
      order by invoice_year desc, invoice_month desc`;

    const months = monthResults.map((x) => x.invoice_period);

    const monthPivot = months.map((x) => `"${x}" numeric`).join(',');

    const query = `
        select * from crosstab(
          $$select
            u.id,
            concat(u.first_name, ' ', u.last_name) as user_name,
            u.email,
		        max(i.invoice_date) as last_invoice_date,
            concat(extract(year from i.created_date),'/',case when extract(month from i.created_date) < 10 then '0' else '' end, extract(month from i.created_date)) invoice_month,
            ROUND(cast(sum(subtotal_dkk) as numeric)) as subtotal_dkk
          from invoice i
          left outer join "user" u on i.user_id = u.id
          where i.created_date > '01 01 2022' and i.status not in ('DRAFT','CANCELLED')
          group by u.id, u.email, user_name, invoice_month
          order by user_name$$,
          $$select
            concat(extract(year from i.created_date),'/',case when extract(month from i.created_date) < 10 then '0' else '' end, extract(month from i.created_date)) invoice_month
            from invoice i
            where i.created_date > '01 01 2022' and i.status not in ('DRAFT','CANCELLED')
            group by invoice_month
            order by invoice_month desc$$
        ) as ct(id numeric, user_name varchar, email varchar, last_invoice_date date, ${monthPivot});
      `;

    results = await prisma.$queryRawUnsafe(query);

    const dateString = new Date().toISOString().split('T')[0];
    const daysAgoString = req.query.days_ago ? `-${parseInt(req.query.days_ago as string, 10)}-days` : '';
    const format = req.query.format === 'csv' ? 'csv' : 'json';
    const downloadAs = `${dateString}-user-invoice-totals${daysAgoString}.${format}`;
    res.setHeader('Content-Disposition', `attachment; filename=${downloadAs}`);

    const data = results.map((x) => ({ ...x, id: Number(x.id) }));

    if (req.query.format === 'csv') {
      const csvAsString = toCSV(data);
      res.setHeader('Content-Type', 'application/csv');
      res.status(200);
      res.send(Buffer.from(csvAsString));
      res.end();
      return;
    }

    res.status(200).json({ data });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: 'internal server error' });
  }
});

export default withSentry(apiRoute);

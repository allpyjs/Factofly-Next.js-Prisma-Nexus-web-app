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

  logger.info(`pages/api/reports/user-activity.ts: ${req.method} request started`);

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

    if (req.query.days_ago) {
      const daysAgo = parseInt(req.query.days_ago as string, 10);
      if (Number.isNaN(daysAgo)) {
        res.status(400).send({ error: 'invalid value for days_ago' });
        return;
      }
      results = await prisma.$queryRaw`
        select
          u.id, u.email, u.referral, u.freelancer_situation, u.user_specified_referral,
          u.created_date as createdDate,
          u.last_active as lastActive,
          round(sum(i.subtotal_dkk)::numeric, 0 ) as invoiceTotal
        from "user" u
        left outer join invoice i on i.user_id = u.id
        where
          (i.status not in ('DRAFT', 'CANCELLED') or i.id is null)
          and u.created_date > now()::date - ${daysAgo}::int
          and u.email not like '%@factofly.com'
        group by u.email, u.referral, u.created_date, u.last_active, u.id
        order by u.created_date;
      `;
    } else {
      results = await prisma.$queryRaw`
        select
          u.id, u.email, u.referral, u.freelancer_situation, u.user_specified_referral,
          u.created_date as createdDate,
          u.last_active as lastActive,
          round(sum(i.subtotal_dkk)::numeric, 0 ) as invoiceTotal
        from "user" u
        left outer join invoice i on i.user_id = u.id
        where
          (i.status not in ('DRAFT', 'CANCELLED') or i.id is null)
          and u.email not like '%@factofly.com'
        group by u.email, u.referral, u.created_date, u.last_active, u.id
        order by u.created_date;
      `;
    }

    const dateString = new Date().toISOString().split('T')[0];
    const daysAgoString = req.query.days_ago ? `-${parseInt(req.query.days_ago as string, 10)}-days` : '';
    const format = req.query.format === 'csv' ? 'csv' : 'json';
    const downloadAs = `${dateString}-user-activity${daysAgoString}.${format}`;
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

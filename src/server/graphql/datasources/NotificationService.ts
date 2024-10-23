import { Deduction, Invoice, Task, User } from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import apiConfig from '~/apiConfig';
import formatCurrency from '~/utils/formatCurrency';
import logger from '~/utils/logger';
import stringify from '~/utils/stringify';
import { IContextData } from '../IContextData';
import { invoiceStatuses } from '../schema/invoices/invoiceStatuses';
import { taskStatuses } from '../schema/tasks/taskStatuses';
import MailService from './MailService';

const sentStatuses = ['SENT_TO_COMPANY', 'SENT_TO_COMPANY_NEEDS_CONTRACT', 'SENT_TO_COMPANY_CONTRACT_MADE'];
const salaryStatuses = ['SALARY_PAID', 'SALARY_PAID_CUSTOMER_PAID', 'SALARY_PAID_CUSTOMER_NOT_PAID'];

async function sendZapNotification(hookUrl: string, user: User, data: any) {
  if (!apiConfig.features.zapNotifications) return;
  await fetch(hookUrl, {
    method: 'POST',
    body: stringify({
      id: user.id,
      email: user.email,
      referral: user.referral,
      displayName: user.firstName ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0],
      ...data
    })
  });
}

export default class NotificationService extends DataSource {
  context!: IContextData;

  initialize(config: DataSourceConfig<IContextData>): void {
    this.context = config.context;
  }

  private mailService: MailService;

  constructor(mailService: MailService) {
    super();
    this.mailService = mailService;
  }

  async invoiceCreated(invoice: Invoice) {
    logger.info('NotificationService.ts: Sending an invoice created notification...', { invoice });

    if (apiConfig.features.zapNotifications) {
      const user = await this.context.prisma.user.findUnique({ where: { id: invoice.userId } });
      if (user) {
        if (invoice.status === invoiceStatuses.SENT) {
          await sendZapNotification(`https://hooks.zapier.com/hooks/catch/6631159/b39mliu/`, user, {
            event: 'invoice_sent',
            amount: formatCurrency(invoice.total, 'dk', invoice.currency),
            link: `${apiConfig.baseUrl}/invoices/${invoice.id}`
          });
        }
      }
    }
  }

  async invoiceUpdated(current: Invoice, previous: Invoice) {
    logger.info('NotificationService.ts: Sending an invoice updated notification...', { current, previous });

    const user = await this.context.prisma.user.findUnique({ where: { id: current.userId } });
    if (
      user &&
      previous.status !== current.status &&
      !(sentStatuses.includes(previous.status) && sentStatuses.includes(current.status)) &&
      !(salaryStatuses.includes(previous.status) && salaryStatuses.includes(current.status))
    ) {
      const t = this.context.i18n.getFixedT(user!.language?.toLowerCase(), 'invoices');
      await this.mailService.sendStatusChangedMail(
        `${user.firstName} ${user.lastName}`,
        user.email,
        user.language,
        t('invoice'),
        current.id,
        t(`statuses.${previous.status}`),
        t(`statuses.${current.status}`),
        `${apiConfig.baseUrl}/invoices/${current.id}`
      );

      if (apiConfig.features.zapNotifications && current.status === invoiceStatuses.SENT) {
        await sendZapNotification(`https://hooks.zapier.com/hooks/catch/6631159/b39mliu/`, user, {
          event: 'invoice_sent',
          amount: formatCurrency(current.total, 'dk', current.currency),
          link: `${apiConfig.baseUrl}/invoices/${current.id}`
        });
      }
    }
  }

  async taskCreated(task: Task) {
    logger.info('NotificationService.ts: Sending a task created notification...', { task });

    if (apiConfig.features.zapNotifications) {
      const user = await this.context.prisma.user.findUnique({ where: { id: task.userId } });
      if (user) {
        if (task.status === invoiceStatuses.SENT) {
          await sendZapNotification(`https://hooks.zapier.com/hooks/catch/6631159/bkq2shc/`, user, {
            event: 'invoice_sent',
            link: `${apiConfig.baseUrl}/tasks/${task.id}`
          });
        }
      }
    }
  }

  async taskUpdated(current: Task, previous: Task) {
    logger.info('NotificationService.ts: Sending a task updated notification...', { current, previous });

    const user = await this.context.prisma.user.findUnique({ where: { id: current.userId } });

    if (user && current.status !== previous.status) {
      const t = this.context.i18n.getFixedT(user!.language?.toLowerCase(), 'tasks');
      await this.mailService.sendStatusChangedMail(
        `${user.firstName} ${user.lastName}`,
        user.email,
        user.language,
        t('task'),
        current.id,
        t(`statuses.${previous.status}`),
        t(`statuses.${current.status}`),
        `${apiConfig.baseUrl}/tasks/${current.id}`
      );

      if (apiConfig.features.zapNotifications && current.status === taskStatuses.SENT) {
        await sendZapNotification(`https://hooks.zapier.com/hooks/catch/6631159/bkq2shc/`, user, {
          event: 'task_sent',
          link: `${apiConfig.baseUrl}/tasks/${current.id}`
        });
      }
    }
  }

  deductionCreated(deduction: Deduction) {
    logger.info('NotificationService.ts: Sending a deduction created notification...', { deduction });
  }

  async deductionUpdated(current: Deduction, previous: Deduction) {
    logger.info('NotificationService.ts: Sending a deduction updated notification...', {
      current,
      previous
    });

    const user = await this.context.prisma.user.findUnique({ where: { id: current.userId } });
    if (user && current.status !== previous.status) {
      const t = this.context.i18n.getFixedT(user!.language?.toLowerCase(), 'deductions');
      await this.mailService.sendStatusChangedMail(
        `${user.firstName} ${user.lastName}`,
        user.email,
        user.language,
        t('deduction'),
        current.id,
        t(`statuses.${previous.status}`),
        t(`statuses.${current.status}`),
        `${apiConfig.baseUrl}/deductions/${current.id}`
      );
    }
  }
}

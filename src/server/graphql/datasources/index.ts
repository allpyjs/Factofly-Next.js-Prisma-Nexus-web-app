import EventService from './EventService';
import AuditService from './AuditService';
import AuthManagementService from './AuthManagmentService';
import DeductionService from './DeductionService';
import EconomicAPI from './EconomicAPI';
import FeatureService from './FeatureService';
import InvoiceService from './InvoiceService';
import MailchimpService from './MailchimpService';
import MailService from './MailService';
import NotificationService from './NotificationService';
import PayrollService from './PayrollService';
import RewardService from './RewardService';
import VirkApi from './VirkAPI';

export type DataSources = {
  virkApi: VirkApi;
  mailService: MailService;
  auditService: AuditService;
  notificationService: NotificationService;
  eventService: EventService;
  economicApi: EconomicAPI;
  mailchimpService: MailchimpService;
  authManagementService: AuthManagementService;
  featureService: FeatureService;
  rewardService: RewardService;
  invoiceService: InvoiceService;
  deductionService: DeductionService;
  payrollService: PayrollService;
};

export default function dataSources(): DataSources {
  // first order services
  const services: any = {
    virkApi: new VirkApi(),
    economicApi: new EconomicAPI(),
    auditService: new AuditService(),
    mailService: new MailService(),
    eventService: new EventService(),
    mailchimpService: new MailchimpService(),
    authManagementService: new AuthManagementService(),
    featureService: new FeatureService(),
    rewardService: new RewardService()
  };

  // second order services
  services.notificationService = new NotificationService(services.mailService);
  services.payrollService = new PayrollService(services.featureService);

  // last order services
  services.invoiceService = new InvoiceService(
    services.auditService,
    services.notificationService,
    services.mailchimpService,
    services.economicApi,
    services.rewardService,
    services.featureService,
    services.payrollService,
    services.eventService
  );
  services.deductionService = new DeductionService(
    services.auditService,
    services.notificationService,
    services.eventService
  );

  return services;
}

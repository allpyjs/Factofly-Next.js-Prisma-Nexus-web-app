/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Type of customer
 */
export enum CustomerTypeEnum {
  BUSINESS = "BUSINESS",
  PRIVATE = "PRIVATE",
}

/**
 * Allowed deduction statuses
 */
export enum DeductionStatusEnum {
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  DELETED_BY_USER = "DELETED_BY_USER",
  DRAFT = "DRAFT",
  SENT = "SENT",
}

/**
 * Allowed invoice statuses
 */
export enum InvoiceStatusEnum {
  APPROVED_BY_COMPANY = "APPROVED_BY_COMPANY",
  CANCELLED = "CANCELLED",
  COMPANY_DISPUTE = "COMPANY_DISPUTE",
  DEBT_COLLECTION = "DEBT_COLLECTION",
  DENIED_BY_COMPANY = "DENIED_BY_COMPANY",
  DRAFT = "DRAFT",
  LATE_PAYMENT = "LATE_PAYMENT",
  MORE_INFO_NEEDED = "MORE_INFO_NEEDED",
  PAID = "PAID",
  PAYMENT_ON_HOLD = "PAYMENT_ON_HOLD",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  PENDING = "PENDING",
  SALARY_PAID = "SALARY_PAID",
  SALARY_PAID_CUSTOMER_NOT_PAID = "SALARY_PAID_CUSTOMER_NOT_PAID",
  SALARY_PAID_CUSTOMER_PAID = "SALARY_PAID_CUSTOMER_PAID",
  SENT = "SENT",
  SENT_TO_COMPANY = "SENT_TO_COMPANY",
  SENT_TO_COMPANY_AWAITING_APPROVAL = "SENT_TO_COMPANY_AWAITING_APPROVAL",
  SENT_TO_COMPANY_CONTRACT_MADE = "SENT_TO_COMPANY_CONTRACT_MADE",
  SENT_TO_COMPANY_NEEDS_CONTRACT = "SENT_TO_COMPANY_NEEDS_CONTRACT",
}

/**
 * Allowed invoice statuses
 */
export enum RecordTypeEnum {
  COMPANY = "COMPANY",
  COOPERATION_AGREEMENT = "COOPERATION_AGREEMENT",
  CUSTOMER = "CUSTOMER",
  DEDUCTION = "DEDUCTION",
  INVOICE = "INVOICE",
  INVOICE_LINE = "INVOICE_LINE",
  REFERRAL = "REFERRAL",
  REWARD = "REWARD",
  SALARY = "SALARY",
  TASK = "TASK",
  USER = "USER",
}

/**
 * Allowed referral statuses
 */
export enum ReferralStatusEnum {
  NONE = "NONE",
  PAID_INVOICE = "PAID_INVOICE",
  SENT_INVOICE = "SENT_INVOICE",
  SIGNED_UP = "SIGNED_UP",
}

/**
 * Users assigned role
 */
export enum RoleEnum {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  USER = "USER",
}

/**
 * Details about when salary needs to be paid for the user
 */
export enum SalaryPaymentTypeEnum {
  EARLY = "EARLY",
  ON_PAYMENT = "ON_PAYMENT",
  TIMED = "TIMED",
  VALUE = "VALUE",
  VIA_INVOICE = "VIA_INVOICE",
}

/**
 * Allowed salary statuses
 */
export enum SalaryStatusEnum {
  DRAFT = "DRAFT",
  PAID = "PAID",
  SENT = "SENT",
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}

/**
 * Allowed task payment types
 */
export enum TaskPaymentTypeEnum {
  PER_HOUR = "PER_HOUR",
  PROJECT_PRICE = "PROJECT_PRICE",
}

/**
 * Allowed task statuses
 */
export enum TaskStatusEnum {
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  DRAFT = "DRAFT",
  MORE_INFO_NEEDED = "MORE_INFO_NEEDED",
  PENDING = "PENDING",
  SENT = "SENT",
}

/**
 * The tax card used for the user
 */
export enum TaxCardEnum {
  MAIN = "MAIN",
  SECONDARY = "SECONDARY",
}

export interface AddressCreateInputArgs {
  address: string;
  default: boolean;
  city: string;
  region?: string | null;
  postalCode: string;
  country: ConnectUniqueInputArgs;
}

export interface AddressOrderByInputArgs {
  active?: SortOrder | null;
  address?: SortOrder | null;
  city?: SortOrder | null;
  countryId?: SortOrder | null;
  country?: CountryOrderByInputArgs | null;
  id?: SortOrder | null;
  region?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  userId?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
  postalCode?: SortOrder | null;
}

export interface AddressUpdateInputArgs {
  active?: boolean | null;
  id: any;
  default?: boolean | null;
  address?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country?: ConnectUniqueInputArgs | null;
}

export interface AddressWhereInputArgs {
  active?: BoolFilter | null;
  address?: StringFilter | null;
  city?: StringFilter | null;
  country?: CountryWhereInputArgs | null;
  id?: BigIntFilter | null;
  userId?: BigIntFilter | null;
  region?: StringFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  postalCode?: StringFilter | null;
}

export interface AuditOrderByInputArgs {
  createdDate?: SortOrder | null;
}

export interface AuditWhereInputArgs {
  id?: BigIntFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  recordId?: BigIntFilter | null;
  recordType?: RecordTypeFilter | null;
  userId?: BigIntFilter | null;
  event?: StringFilter | null;
}

export interface BigIntFilter {
  equals?: any | null;
  gt?: any | null;
  gte?: any | null;
  in?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  notIn?: any[] | null;
  not?: any | null;
}

export interface BoolFilter {
  equals?: boolean | null;
  not?: boolean | null;
}

export interface ConnectDisconnectUniqueInputArgs {
  connect: WhereUniqueInputArgs;
}

export interface ConnectUniqueInputArgs {
  connect: WhereUniqueInputArgs;
}

export interface CooperationAgreementCreateInputArgs {
  active: boolean;
  startDate: any;
  endDate?: any | null;
  customerId: any;
  openEnded: boolean;
  terminationAgreement: string;
  taskDescription: string;
  extraWork: boolean;
  extraWorkNotification?: string | null;
  extraWorkNotificationOther?: string | null;
  equipmentSupplied?: boolean | null;
  equipmentDetails?: string | null;
  specialConditions: string;
  paymentType: string;
  paymentTerm: string;
  paymentTermOther?: string | null;
  paymentTermDays: number;
  paymentTermSpecial: string;
  deliverables?: CooperationAgreementCreateNestedDeliverableInputArgs | null;
  createAsUserId?: any | null;
}

export interface CooperationAgreementCreateNestedDeliverableInputArgs {
  create: DeliverableCreateInputArgs[];
}

export interface CooperationAgreementOrderByInputArgs {
  startDate?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
}

export interface CooperationAgreementUpdateInputArgs {
  active?: boolean | null;
  startDate?: any | null;
  endDate?: any | null;
  openEnded?: boolean | null;
  customerId?: any | null;
  terminationAgreement?: string | null;
  taskDescription?: string | null;
  extraWork?: boolean | null;
  extraWorkNotification?: string | null;
  extraWorkNotificationOther?: string | null;
  equipmentSupplied?: boolean | null;
  equipmentDetails?: string | null;
  specialConditions?: string | null;
  paymentType?: string | null;
  paymentTerm?: string | null;
  paymentTermOther?: string | null;
  paymentTermDays?: number | null;
  paymentTermSpecial?: string | null;
  deliverables?: CooperationAgreementUpdateNestedDeliverablesInputArgs | null;
}

export interface CooperationAgreementUpdateNestedDeliverableInputArgs {
  data: DeliverableUpdateInputArgs;
  where: WhereUniqueInputArgs;
}

export interface CooperationAgreementUpdateNestedDeliverablesInputArgs {
  update?: CooperationAgreementUpdateNestedDeliverableInputArgs[] | null;
  create?: DeliverableCreateInputArgs[] | null;
  delete?: WhereUniqueInputArgs[] | null;
}

export interface CooperationAgreementWhereInputArgs {
  id?: BigIntFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  startDate?: DateTimeFilter | null;
  user?: UserWhereInputArgs | null;
  active?: BoolFilter | null;
  query?: string | null;
}

export interface CountryOrderByInputArgs {
  id?: SortOrder | null;
  code?: SortOrder | null;
  name_en?: SortOrder | null;
  name_da?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  active?: SortOrder | null;
}

export interface CountryWhereInputArgs {
  id?: BigIntFilter | null;
  code?: StringFilter | null;
  name?: StringFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  active?: BoolFilter | null;
}

export interface CustomerCreateInputArgs {
  type: CustomerTypeEnum;
  contact: string;
  vatId?: string | null;
  ean?: any | null;
  email: string;
  name: string;
  paymentDueDays?: number | null;
  phoneNumber: string;
  address: CustomerCreateNestedAddressInputArgs;
  createAsUserId?: any | null;
}

export interface CustomerCreateNestedAddressInputArgs {
  create: AddressCreateInputArgs;
}

export interface CustomerOrderByInputArgs {
  active?: SortOrder | null;
  type?: SortOrder | null;
  contact?: SortOrder | null;
  vatId?: SortOrder | null;
  ean?: SortOrder | null;
  email?: SortOrder | null;
  id?: SortOrder | null;
  name?: SortOrder | null;
  paymentDueDays?: SortOrder | null;
  phoneNumber?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  userId?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
  addressId?: SortOrder | null;
  address?: AddressOrderByInputArgs | null;
}

export interface CustomerTypeFilter {
  equals?: CustomerTypeEnum | null;
  in?: CustomerTypeEnum[] | null;
  notIn?: CustomerTypeEnum[] | null;
  not?: CustomerTypeEnum | null;
}

export interface CustomerUpdateInputArgs {
  active?: boolean | null;
  type?: CustomerTypeEnum | null;
  contact?: string | null;
  vatId?: string | null;
  ean?: any | null;
  email?: string | null;
  name?: string | null;
  paymentDueDays?: number | null;
  phoneNumber?: string | null;
  address?: CustomerUpdateNestedAddressInputArgs | null;
  allowEarlyPayment?: boolean | null;
}

export interface CustomerUpdateNestedAddressInputArgs {
  update: AddressUpdateInputArgs;
}

export interface CustomerWhereInputArgs {
  active?: BoolFilter | null;
  type?: CustomerTypeFilter | null;
  contact?: StringFilter | null;
  vatId?: BigIntFilter | null;
  ean?: BigIntFilter | null;
  email?: StringFilter | null;
  id?: BigIntFilter | null;
  name?: StringFilter | null;
  paymentDueDays?: IntFilter | null;
  phoneNumber?: StringFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  user?: UserWhereInputArgs | null;
  private?: BoolFilter | null;
  address?: AddressWhereInputArgs | null;
  query?: string | null;
}

export interface DateTimeFilter {
  equals?: string | null;
  gt?: string | null;
  gte?: string | null;
  in?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  notIn?: string[] | null;
  not?: string | null;
}

export interface DeductionCreateInputArgs {
  description: string;
  status: DeductionStatusEnum;
  createAsUserId?: any | null;
  total: any;
  includeVat: boolean;
  currency: string;
}

export interface DeductionListRelationWhereArgs {
  every?: DeductionWhereInputArgs | null;
  some?: DeductionWhereInputArgs | null;
  none?: DeductionWhereInputArgs | null;
}

export interface DeductionOrderByInputArgs {
  description?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  userId?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
  status?: SortOrder | null;
}

export interface DeductionStatusFilter {
  equals?: DeductionStatusEnum | null;
  in?: DeductionStatusEnum[] | null;
  notIn?: DeductionStatusEnum[] | null;
  not?: DeductionStatusEnum | null;
}

export interface DeductionUpdateInputArgs {
  description?: string | null;
  active?: boolean | null;
  status?: DeductionStatusEnum | null;
  total?: any | null;
  includeVat?: boolean | null;
  currency?: string | null;
}

export interface DeductionWhereInputArgs {
  id?: BigIntFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  status?: DeductionStatusFilter | null;
  active?: BoolFilter | null;
  description?: StringFilter | null;
  user?: UserWhereInputArgs | null;
  query?: string | null;
}

export interface DeliverableCreateInputArgs {
  description: string;
}

export interface DeliverableUpdateInputArgs {
  description?: string | null;
}

export interface IntFilter {
  equals?: number | null;
  gt?: number | null;
  gte?: number | null;
  in?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  notIn?: number[] | null;
  not?: number | null;
}

export interface InvoiceBulkUpdateInputArgs {
  data?: InvoiceUpdateInputArgs | null;
  where?: WhereUniqueInputArgs | null;
}

export interface InvoiceCreateInputArgs {
  customer: InvoiceCreateNestedCustomerInputArgs;
  customerContact: string;
  customerEmail: string;
  sendInvoiceCopyTo?: string | null;
  task?: InvoiceCreateNestedTaskInputArgs | null;
  invoiceDate: any;
  reference?: string | null;
  startDate: any;
  endDate: any;
  jobType: InvoiceCreateNestedJobTypeInputArgs;
  hoursWorked: number;
  useCredit: boolean;
  paymentDueDays: number;
  currency: string;
  vacationPayment: boolean;
  includeVat: boolean;
  earlyPayment: boolean;
  lines: InvoiceCreateNestedLineInputArgs;
  termsAccepted: boolean;
  note?: string | null;
  status: InvoiceStatusEnum;
  createAsUserId?: any | null;
}

export interface InvoiceCreateNestedCustomerInputArgs {
  connect?: WhereUniqueInputArgs | null;
  create?: CustomerCreateInputArgs | null;
}

export interface InvoiceCreateNestedJobTypeInputArgs {
  connect: WhereUniqueInputArgs;
}

export interface InvoiceCreateNestedLineInputArgs {
  create: InvoiceLineCreateInputArgs[];
}

export interface InvoiceCreateNestedTaskInputArgs {
  connect: WhereUniqueInputArgs;
}

export interface InvoiceLineCreateInputArgs {
  description: string;
  unitPrice: number;
  quantity: number;
  discountPercentage?: number | null;
  unit?: string | null;
  index: number;
}

export interface InvoiceLineUpdateInputArgs {
  active?: boolean | null;
  description?: string | null;
  unitPrice?: number | null;
  discountPercentage?: number | null;
  unit?: string | null;
  index?: number | null;
  quantity?: number | null;
}

export interface InvoiceListRelationWhereArgs {
  every?: InvoiceWhereInputArgs | null;
  some?: InvoiceWhereInputArgs | null;
  none?: InvoiceWhereInputArgs | null;
}

export interface InvoiceOrderByInputArgs {
  active?: SortOrder | null;
  vacationPayment?: SortOrder | null;
  currency?: SortOrder | null;
  customerId?: SortOrder | null;
  customer?: CustomerOrderByInputArgs | null;
  endDate?: SortOrder | null;
  hoursWorked?: SortOrder | null;
  id?: SortOrder | null;
  note?: SortOrder | null;
  invoiceDate?: SortOrder | null;
  paymentDueDays?: SortOrder | null;
  reference?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  startDate?: SortOrder | null;
  status?: SortOrder | null;
  taskId?: SortOrder | null;
  task?: TaskOrderByInputArgs | null;
  termsAccepted?: SortOrder | null;
  userId?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
  total?: SortOrder | null;
  includeVat?: SortOrder | null;
  jobTypeId?: SortOrder | null;
  jobType?: JobTypeOrderByInputArgs | null;
}

export interface InvoiceStatusFilter {
  equals?: InvoiceStatusEnum | null;
  in?: InvoiceStatusEnum[] | null;
  notIn?: InvoiceStatusEnum[] | null;
  not?: InvoiceStatusEnum | null;
}

export interface InvoiceUpdateInputArgs {
  customer?: InvoiceUpdateNestedCustomerInputArgs | null;
  customerContact?: string | null;
  customerEmail?: string | null;
  sendInvoiceCopyTo?: string | null;
  task?: InvoiceUpdateNestedTaskInputArgs | null;
  invoiceDate?: any | null;
  reference?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  jobType?: InvoiceUpdateNestedJobTypeInputArgs | null;
  hoursWorked?: number | null;
  useCredit?: boolean | null;
  paymentDueDays?: number | null;
  currency?: string | null;
  vacationPayment?: boolean | null;
  includeVat?: boolean | null;
  earlyPayment?: boolean | null;
  paidAmountDkk?: any | null;
  lines?: InvoiceUpdateNestedLinesInputArgs | null;
  active?: boolean | null;
  termsAccepted?: boolean | null;
  note?: string | null;
  status?: InvoiceStatusEnum | null;
}

export interface InvoiceUpdateNestedCustomerInputArgs {
  connect?: WhereUniqueInputArgs | null;
  create?: CustomerCreateInputArgs | null;
}

export interface InvoiceUpdateNestedJobTypeInputArgs {
  connect: WhereUniqueInputArgs;
}

export interface InvoiceUpdateNestedLineInputArgs {
  data: InvoiceLineUpdateInputArgs;
  where: WhereUniqueInputArgs;
}

export interface InvoiceUpdateNestedLinesInputArgs {
  update?: InvoiceUpdateNestedLineInputArgs[] | null;
  create?: InvoiceLineCreateInputArgs[] | null;
  delete?: WhereUniqueInputArgs[] | null;
}

export interface InvoiceUpdateNestedTaskInputArgs {
  connect?: WhereUniqueInputArgs | null;
  disconnect?: boolean | null;
}

export interface InvoiceWhereInputArgs {
  active?: BoolFilter | null;
  vacationPayment?: BoolFilter | null;
  currency?: StringFilter | null;
  customer?: CustomerWhereInputArgs | null;
  endDate?: DateTimeFilter | null;
  hoursWorked?: IntFilter | null;
  id?: BigIntFilter | null;
  note?: StringFilter | null;
  invoiceDate?: DateTimeFilter | null;
  paymentDueDays?: IntFilter | null;
  reference?: StringFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  startDate?: DateTimeFilter | null;
  status?: InvoiceStatusFilter | null;
  termsAccepted?: BoolFilter | null;
  user?: UserWhereInputArgs | null;
  task?: TaskWhereInputArgs | null;
  includeVat?: BoolFilter | null;
  jobType?: JobTypeWhereInputArgs | null;
  salaryId?: BigIntFilter | null;
  query?: string | null;
}

export interface JobTypeOrderByInputArgs {
  classification?: SortOrder | null;
  description?: SortOrder | null;
  id?: SortOrder | null;
  name_en?: SortOrder | null;
  name_da?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  active?: SortOrder | null;
  group?: SortOrder | null;
  parentId?: SortOrder | null;
}

export interface JobTypeWhereInputArgs {
  active?: BoolFilter | null;
  classification?: StringFilter | null;
  name?: StringFilter | null;
  description?: StringFilter | null;
  id?: any | null;
  group?: BoolFilter | null;
  parent?: JobTypeWhereInputArgs | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
}

export interface RecordTypeFilter {
  equals?: RecordTypeEnum | null;
  in?: RecordTypeEnum[] | null;
  notIn?: RecordTypeEnum[] | null;
  not?: RecordTypeEnum | null;
}

export interface ReferralCreateInputArgs {
  email: string;
  message: string;
  createAsUserId?: any | null;
}

export interface ReferralOrderByInputArgs {
  id?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
}

export interface ReferralStatusFilter {
  equals?: ReferralStatusEnum | null;
  in?: ReferralStatusEnum[] | null;
  notIn?: ReferralStatusEnum[] | null;
  not?: ReferralStatusEnum | null;
}

export interface ReferralWhereInputArgs {
  id?: BigIntFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  user?: UserWhereInputArgs | null;
  status?: ReferralStatusFilter | null;
  email?: StringFilter | null;
  referredUser?: UserWhereInputArgs | null;
  query?: string | null;
}

export interface RoleFilter {
  equals?: RoleEnum | null;
  in?: RoleEnum[] | null;
  notIn?: RoleEnum[] | null;
  not?: RoleEnum | null;
}

export interface SalaryCreateInputArgs {
  paymentDate: any;
  invoices?: number[] | null;
  deductions?: number[] | null;
  userId?: any | null;
}

export interface SalaryOrderByInputArgs {
  id?: SortOrder | null;
  paymentDate?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  userId?: SortOrder | null;
  status?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
}

export interface SalaryStatusFilter {
  equals?: SalaryStatusEnum | null;
  in?: SalaryStatusEnum[] | null;
  notIn?: SalaryStatusEnum[] | null;
  not?: SalaryStatusEnum | null;
}

export interface SalaryUpdateInputArgs {
  id?: any | null;
  paymentDate?: any | null;
  status?: SalaryStatusEnum | null;
  invoices?: number[] | null;
  deductions?: number[] | null;
}

export interface SalaryWhereInputArgs {
  id?: BigIntFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  paymentDate?: DateTimeFilter | null;
  user?: UserWhereInputArgs | null;
  status?: SalaryStatusFilter | null;
  invoices?: InvoiceListRelationWhereArgs | null;
  deductions?: DeductionListRelationWhereArgs | null;
  query?: string | null;
}

export interface ServiceLogOrderByInputArgs {
  createdDate?: SortOrder | null;
}

export interface ServiceLogWhereInputArgs {
  id?: BigIntFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  recordId?: BigIntFilter | null;
  recordType?: RecordTypeFilter | null;
  status?: StringFilter | null;
}

export interface StringFilter {
  contains?: string | null;
  endsWith?: string | null;
  equals?: string | null;
  gt?: string | null;
  gte?: string | null;
  in?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  notIn?: string[] | null;
  startsWith?: string | null;
  not?: string | null;
}

export interface TaskCreateInputArgs {
  endDate: any;
  expectedHours: number;
  reference?: string | null;
  startDate: any;
  termsAccepted: boolean;
  title: string;
  customer: TaskCreateNestedCustomerInputArgs;
  jobType: TaskCreateNestedJobTypeInputArgs;
  status: TaskStatusEnum;
  description?: string | null;
  paymentType?: TaskPaymentTypeEnum | null;
  paymentAmount?: any | null;
  createAsUserId?: any | null;
}

export interface TaskCreateNestedCustomerInputArgs {
  connect?: WhereUniqueInputArgs | null;
  create?: CustomerCreateInputArgs | null;
}

export interface TaskCreateNestedJobTypeInputArgs {
  connect: WhereUniqueInputArgs;
}

export interface TaskOrderByInputArgs {
  id?: SortOrder | null;
  active?: SortOrder | null;
  expectedHours?: SortOrder | null;
  reference?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
  startDate?: SortOrder | null;
  endDate?: SortOrder | null;
  termsAccepted?: SortOrder | null;
  title?: SortOrder | null;
  customerId?: SortOrder | null;
  customer?: CustomerOrderByInputArgs | null;
  jobTypeId?: SortOrder | null;
  jobType?: JobTypeOrderByInputArgs | null;
  userId?: SortOrder | null;
  user?: UserOrderByInputArgs | null;
  status?: SortOrder | null;
}

export interface TaskStatusFilter {
  equals?: TaskStatusEnum | null;
  in?: TaskStatusEnum[] | null;
  notIn?: TaskStatusEnum[] | null;
  not?: TaskStatusEnum | null;
}

export interface TaskUpdateInputArgs {
  endDate?: any | null;
  expectedHours?: number | null;
  reference?: string | null;
  startDate?: any | null;
  termsAccepted?: boolean | null;
  active?: boolean | null;
  title?: string | null;
  customer?: TaskUpdateNestedCustomerInputArgs | null;
  jobType?: TaskUpdateNestedJobTypeInputArgs | null;
  status?: TaskStatusEnum | null;
  description?: string | null;
  paymentType?: TaskPaymentTypeEnum | null;
  paymentAmount?: any | null;
}

export interface TaskUpdateNestedCustomerInputArgs {
  connect?: WhereUniqueInputArgs | null;
  create?: CustomerCreateInputArgs | null;
}

export interface TaskUpdateNestedJobTypeInputArgs {
  connect: WhereUniqueInputArgs;
}

export interface TaskWhereInputArgs {
  active?: BoolFilter | null;
  customer?: CustomerWhereInputArgs | null;
  endDate?: DateTimeFilter | null;
  expectedHours?: IntFilter | null;
  id?: BigIntFilter | null;
  jobType?: JobTypeWhereInputArgs | null;
  reference?: StringFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  startDate?: DateTimeFilter | null;
  status?: TaskStatusFilter | null;
  termsAccepted?: BoolFilter | null;
  title?: StringFilter | null;
  user?: UserWhereInputArgs | null;
  invoices?: InvoiceListRelationWhereArgs | null;
  query?: string | null;
}

export interface UserOrderByInputArgs {
  active?: SortOrder | null;
  address?: AddressOrderByInputArgs | null;
  internalId?: SortOrder | null;
  firstName?: SortOrder | null;
  lastName?: SortOrder | null;
  displayName?: SortOrder | null;
  phoneNumber?: SortOrder | null;
  title?: SortOrder | null;
  email?: SortOrder | null;
  role?: SortOrder | null;
  referral?: SortOrder | null;
  freelancerSituation?: SortOrder | null;
  userSpecifiedReferral?: SortOrder | null;
  lastActive?: SortOrder | null;
  createdDate?: SortOrder | null;
  updatedDate?: SortOrder | null;
}

export interface UserUpdateInputArgs {
  language?: string | null;
  unit?: string | null;
  currency?: string | null;
  jobType?: ConnectDisconnectUniqueInputArgs | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  salaryPaymentType?: SalaryPaymentTypeEnum | null;
  salaryPaymentValue?: number | null;
  salaryPaymentDay?: number | null;
  baseRate?: number | null;
  vacationPayment?: boolean | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  countryId?: any | null;
  userSpecifiedReferral?: string | null;
  freelancerSituation?: string | null;
  bankName?: string | null;
  bankAccount?: string | null;
  bankRegistration?: string | null;
  accountSetupComplete?: boolean | null;
  personId?: string | null;
  taxCard?: TaxCardEnum | null;
}

export interface UserWhereInputArgs {
  active?: BoolFilter | null;
  customer?: WhereUniqueInputArgs | null;
  address?: WhereUniqueInputArgs | null;
  id?: BigIntFilter | null;
  createdDate?: DateTimeFilter | null;
  updatedDate?: DateTimeFilter | null;
  lastActive?: DateTimeFilter | null;
  referral?: StringFilter | null;
  email?: StringFilter | null;
  phoneNumber?: StringFilter | null;
  lastName?: StringFilter | null;
  displayName?: StringFilter | null;
  firstName?: StringFilter | null;
  role?: RoleFilter | null;
  query?: string | null;
}

export interface WhereUniqueInputArgs {
  id: any;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

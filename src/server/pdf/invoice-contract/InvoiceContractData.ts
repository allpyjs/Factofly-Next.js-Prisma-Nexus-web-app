import { ContractCustomerData } from '../shared/ContractCustomerData';
import { ContractUserData } from '../shared/ContractUserData';

export type InvoiceLineContractData = {
  description: string;
  price: number;
  amount: number;
  total: number;
};

export type InvoiceContractData = {
  id: bigint;
  paymentDueDays: number;
  currency: string;
  invoiceDate: Date;
  pricePerHour: number;
  hoursWorked: number;
  startDate: Date;
  endDate: Date;
  subtotal: number;
  tax: number;
  total: number;
  user: ContractUserData;
  customer: ContractCustomerData;
  lines: InvoiceLineContractData[];
};

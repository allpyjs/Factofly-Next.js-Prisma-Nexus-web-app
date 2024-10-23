import { ContractCustomerData } from '../shared/ContractCustomerData';
import { ContractUserData } from '../shared/ContractUserData';

export interface TaskContractData {
  id: bigint;
  expectedHours: number;
  title: string;
  startDate: Date;
  endDate: Date;
  user: ContractUserData;
  customer: ContractCustomerData;
  jobType: string;

  description?: string;
  paymentType?: string;
  paymentAmount?: number;
}

import { Address, Country, Customer, JobType, Task, User } from '@prisma/client';
import languages from '~/constants/languages';
import toAddressData from '../shared/mapping/toAddressData';
import { TaskContractData } from './TaskContractData';

type AddressWithCountry = Address & { country: Country };
type CustomerWithAddress = Customer & { addresses: AddressWithCountry[] };
type UserWithAddress = User & { addresses: AddressWithCountry[] };

export default function toTaskContractData(
  task: Task & {
    jobType: JobType;
    user: UserWithAddress;
    customer: CustomerWithAddress;
  },
  lang: string
): TaskContractData {
  const customerAddress = task.customer.addresses[0];
  const userAddress = task.user.addresses[0];

  return {
    id: task.id,
    title: task.title,
    expectedHours: task.expectedHours,
    startDate: task.startDate,
    endDate: task.endDate,
    jobType: lang === languages.DA ? task.jobType.name_da : task.jobType.name_en,
    description: task.description ?? undefined,
    paymentType: task.paymentType ?? undefined,
    paymentAmount: Number(task.paymentAmount) ?? undefined,
    user: {
      id: task.user.id,
      firstName: task.user.firstName!,
      lastName: task.user.lastName!,
      address: toAddressData(userAddress, lang)
    },
    customer: {
      name: task.customer.name,
      vatId: task.customer.vatId ?? undefined,
      address: toAddressData(customerAddress, lang)
    }
  };
}

import { Address, Country, Customer, Invoice, InvoiceLine, User } from '@prisma/client';
import toAddressData from '../shared/mapping/toAddressData';
import { InvoiceContractData } from './InvoiceContractData';

type AddressWithCountry = Address & { country: Country };
type CustomerWithAddress = Customer & { addresses: AddressWithCountry[] };
type UserWithAddress = User & { addresses: AddressWithCountry[] };

export default function toInvoiceContractData(
  invoice: Invoice & {
    user: UserWithAddress;
    customer: CustomerWithAddress;
    lines: InvoiceLine[];
  },
  lang: string
): InvoiceContractData {
  const customerAddress = invoice.customer.addresses[0];
  const userAddress = invoice.user.addresses[0];

  const subtotal = invoice.lines.reduce((prev, current) => prev + current.quantity * current.unitPrice, 0);
  const tax = invoice.includeVat ? subtotal * 0.25 : 0;
  const total = subtotal + tax;

  return {
    id: invoice.id,
    hoursWorked: invoice.hoursWorked,
    invoiceDate: invoice.invoiceDate,
    paymentDueDays: invoice.paymentDueDays,
    pricePerHour: subtotal / invoice.hoursWorked,
    currency: invoice.currency,
    total,
    subtotal,
    tax,
    startDate: invoice.startDate!,
    endDate: invoice.endDate!,
    user: {
      id: invoice.user.id,
      firstName: invoice.user.firstName!,
      lastName: invoice.user.lastName!,
      address: toAddressData(userAddress, lang)
    },
    customer: {
      name: invoice.customer.name,
      vatId: invoice.customer.vatId ?? undefined,
      address: toAddressData(customerAddress, lang)
    },
    lines: invoice.lines.map((line: InvoiceLine) => ({
      description: line.description,
      price: line.unitPrice,
      amount: line.quantity,
      total: line.unitPrice * line.quantity
    }))
  };
}

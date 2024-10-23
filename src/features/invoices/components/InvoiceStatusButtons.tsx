import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';
import useUser from '~/contexts/User/useUser';
import SubmitButton from '~/features/forms/components/SubmitButton';
import useSendInvoice from '../hooks/useSendInvoice.ts';
import useUpdateInvoiceStatus from '../hooks/useUpdateInvoiceStatus';

type InvoiceStatusButtonsProps = {
  invoiceId: number;
  invoiceStatus: InvoiceStatusEnum;
};

const statusMap = [
  {
    source: InvoiceStatusEnum.DRAFT,
    target: InvoiceStatusEnum.SENT,
    icon: 'uil-arrow-right',
    text: 'buttons.send',
    adminOnly: false
  },
  {
    source: InvoiceStatusEnum.SENT,
    target: InvoiceStatusEnum.PENDING,
    icon: 'uil-fast-mail',
    text: 'buttons.sendToEconomic',
    adminOnly: true
  },
  {
    source: InvoiceStatusEnum.PENDING,
    target: InvoiceStatusEnum.SENT_TO_COMPANY,
    icon: 'uil-fast-mail',
    text: 'buttons.sendToCompany',
    adminOnly: true
  },
  {
    source: InvoiceStatusEnum.SENT_TO_COMPANY,
    target: InvoiceStatusEnum.PAID,
    icon: 'uil-money-stack',
    text: 'buttons.paymentReceived',
    adminOnly: true
  },
  {
    source: InvoiceStatusEnum.SENT,
    target: InvoiceStatusEnum.DRAFT,
    icon: 'uil-arrow-left',
    text: 'buttons.unsend',
    adminOnly: false
  }
];

export default function InvoiceStatusButtons({
  invoiceId,
  invoiceStatus
}: InvoiceStatusButtonsProps): JSX.Element {
  const { t } = useTranslation('invoices');
  const { isAdmin } = useUser();
  const { updateInvoiceStatus, updating } = useUpdateInvoiceStatus();
  const { sendInvoice, updating: sending } = useSendInvoice();

  const [amount, setAmount] = useState<string>();

  return (
    <>
      {statusMap.map(
        ({ source, target, icon, text, adminOnly }) =>
          invoiceStatus === source &&
          (isAdmin || !adminOnly) && (
            <span className="m-0p-0 align-top float-end">
              <div className="input-group mb-3">
                {target === InvoiceStatusEnum.PAID && (
                  <>
                    <input
                      className=" ms-2 form-control"
                      style={{ width: 100 }}
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                    <span className="input-group-text">dkk</span>
                  </>
                )}
                <SubmitButton
                  icon={<i className={`uil ${icon}`} />}
                  onClick={() => updateInvoiceStatus(invoiceId, target, amount ?? undefined)}
                  title={t(text)}
                  saving={updating}
                />
              </div>
            </span>
          )
      )}
      {invoiceStatus === InvoiceStatusEnum.PENDING && isAdmin && (
        <SubmitButton
          icon={<i className="uil uil-fast-mail" />}
          onClick={() => sendInvoice(invoiceId)}
          title="Re-send to economic"
          saving={sending}
        />
      )}
    </>
  );
}

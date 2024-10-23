import path from 'path';
import PdfPrinter from 'pdfmake';
import { ContentImage, ContentStack, ContentText } from 'pdfmake/interfaces';
import i18NextServer from '../../utils/i18NextServer';
import { InvoiceContractData } from './InvoiceContractData';

import { addDays, toDateString } from '~/utils/formatDate';
import footer from '../shared/footer';
import formatCurrency from '~/utils/formatCurrency';

const assetPath = path.join(__dirname, '../../../../../public/');

const fonts = {
  Roboto: {
    normal: path.join(assetPath, '/fonts/Roboto-Regular.ttf'),
    bold: path.join(assetPath, '/fonts/Roboto-Bold.ttf'),
    italics: path.join(assetPath, '/fonts/Roboto-Italic.ttf')
  }
};

export default async function generateInvoiceContract(
  data: InvoiceContractData,
  lang: string
): Promise<PDFKit.PDFDocument> {
  const pdfPrinter = new PdfPrinter(fonts);
  const t = i18NextServer.getFixedT(lang.toLowerCase(), 'contracts');

  if (!data) {
    throw new Error('Missing data');
  }

  const title: ContentText = {
    margin: [0, 20, 0, 0],
    text: t('headers.title'),
    fontSize: 20,
    bold: true
  };
  const logo: ContentImage = { image: path.join(assetPath, '/images/logo_black_big.png'), width: 215 };

  const userInfo: ContentStack = {
    fontSize: 9,
    stack: [
      { text: t('fields.worker'), bold: true },
      `${data.user.firstName} ${data.user.lastName}`,
      data.user.address?.address || t('noAddress'),
      `${data.user.address?.city} ${data.user.address?.postalCode}`
    ]
  };

  const customerInfo: ContentStack = {
    fontSize: 9,
    stack: [
      { text: t('fields.customer'), bold: true },
      { text: data.customer.name },
      { text: data.customer.address.address },
      { text: `${data.customer.address.city} ${data.customer.address.postalCode}` },
      {
        text: `${t('fields.vatId.dk')}: ${data.customer.vatId || t('values.empty')}`,
        margin: [0, 5, 0, 0],
        italics: true
      }
    ]
  };

  const agreementInfo: ContentStack = {
    fontSize: 9,
    margin: [0, 20, 0, 0],
    stack: [
      { text: t('headers.paymentTerms'), bold: true },
      {
        text: t('values.paymentDueDays', {
          days: data.paymentDueDays,
          date: toDateString(addDays(data.invoiceDate, data.paymentDueDays), 'da')
        })
      },
      { text: t('values.pricePerHour', { price: formatCurrency(data.pricePerHour, lang, data.currency) }) }
    ]
  };

  const invoiceInformationHeaderStack: ContentStack = {
    stack: [
      t('fields.taskNumber'),
      t('fields.userNumber'),
      t('fields.invoiceDate'),
      t('fields.startDate'),
      t('fields.endDate'),
      t('fields.hours')
    ]
  };

  const invoiceInformationValuesStack: ContentStack = {
    alignment: 'right',
    stack: [
      data.id.toString(),
      data.user.id.toString(),
      toDateString(data.invoiceDate, 'da'),
      toDateString(data.startDate, 'da'),
      toDateString(data.endDate, 'da'),
      data.hoursWorked.toString()
    ]
  };

  const invoiceInfo: ContentStack = {
    fontSize: 9,
    margin: [0, 20, 0, 0],
    stack: [
      { text: t('headers.invoiceInformation'), bold: true },
      { columns: [invoiceInformationHeaderStack, invoiceInformationValuesStack] }
    ]
  };

  const tableHeader = (text: string) => ({ fillColor: '#efefef', text, bold: true });

  const invoiceLines: ContentStack = {
    margin: [0, 20, 0, 0],
    fontSize: 9,
    stack: [
      {
        // layout: 'lightHorizontalLines',
        layout: {
          hLineColor() {
            return '#efefef';
          },
          vLineColor() {
            return '#efefef';
          },
          hLineWidth(i, node) {
            if (i === 0 || i > node.table.body.length - 5) {
              return 0;
            }
            return 1;
          },
          vLineWidth() {
            return 0;
          }
        },
        table: {
          headerRows: 1,
          widths: [250, 80, 80, 80],
          body: [
            [
              tableHeader(t('fields.description')),
              tableHeader(t('fields.price')),
              tableHeader(t('fields.amount')),
              tableHeader(t('fields.lineTotal'))
            ],
            ...data.lines.map((line) => [
              line.description,
              line.price,
              line.amount,
              formatCurrency(line.total, lang, data.currency)
            ]),
            ['', '', '', ''],
            [
              '',
              { colSpan: 2, text: t('fields.subtotal'), bold: true },
              '',
              { text: formatCurrency(data.subtotal, lang, data.currency), bold: true }
            ],
            ['', { colSpan: 2, text: 'Moms 25%' }, '', formatCurrency(data.tax, lang, data.currency)],
            [
              '',
              { fillColor: '#efefef', colSpan: 2, text: t('fields.total'), bold: true },
              '',
              { fillColor: '#efefef', text: formatCurrency(data.total, lang, data.currency), bold: true }
            ]
          ]
        }
      }
    ]
  };

  const content = [
    {
      columns: [
        {
          width: '60%',
          stack: [title]
        },
        {
          width: '*',
          stack: [logo]
        }
      ]
    },
    {
      columns: [
        {
          width: '60%',
          stack: [userInfo]
        },
        {
          width: '*',
          stack: [customerInfo]
        }
      ]
    },
    {
      columns: [
        {
          width: '60%',
          stack: []
        },
        {
          width: '*',
          stack: [invoiceInfo]
        }
      ]
    },
    invoiceLines,
    {
      columns: [
        {
          width: '60%',
          stack: [agreementInfo]
        },
        {
          width: '*',
          stack: []
        }
      ]
    }
  ];

  return pdfPrinter.createPdfKitDocument({
    pageSize: 'A4',
    pageMargins: [40, 20, 40, 60],
    content,
    footer
  });
}

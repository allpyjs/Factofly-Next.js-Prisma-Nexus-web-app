import path from 'path';
import PdfPrinter from 'pdfmake';
import { ContentImage, ContentStack, ContentText } from 'pdfmake/interfaces';
import { TaskContractData } from './TaskContractData';

import { toDateString } from '~/utils/formatDate';
import footer from '../shared/footer';
import i18NextServer from '~/server/utils/i18NextServer';
import formatCurrency from '~/utils/formatCurrency';

const assetPath = path.join(__dirname, '../../../../../public/');

const fonts = {
  Roboto: {
    normal: path.join(assetPath, '/fonts/Roboto-Regular.ttf'),
    bold: path.join(assetPath, '/fonts/Roboto-Bold.ttf'),
    italics: path.join(assetPath, '/fonts/Roboto-Italic.ttf')
  }
};

export default async function generateTaskContract(
  data: TaskContractData,
  lang: string
): Promise<PDFKit.PDFDocument> {
  const pdfPrinter = new PdfPrinter(fonts);
  const t = await i18NextServer.getFixedT(lang.toLowerCase(), 'contracts');
  const tTasks = await i18NextServer.getFixedT(lang.toLowerCase(), 'tasks');

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
    stack: [{ text: t('headers.paymentTerms'), bold: true }, { text: t('values.later') }]
  };

  const description: ContentStack = {
    fontSize: 9,
    margin: [0, 20, 0, 0],
    stack: [{ text: t('fields.description'), bold: true }, { text: data.description ?? '' }]
  };

  const taskInformationHeaderStack: ContentStack = {
    stack: [
      t('fields.taskNumber'),
      t('fields.userNumber'),
      t('fields.date'),
      t('fields.startDate'),
      t('fields.endDate'),
      t('fields.hours'),
      t('fields.jobType'),
      t('fields.paymentType'),
      t('fields.paymentAmount')
    ]
  };

  const taskInformationValuesStack: ContentStack = {
    alignment: 'right',
    stack: [
      data.id.toString(),
      data.user.id.toString(),
      toDateString(new Date(), 'da'),
      toDateString(data.startDate, 'da'),
      toDateString(data.endDate, 'da'),
      data.expectedHours.toString(),
      data.jobType,
      data.paymentType ? tTasks(`taskPaymentTypes.${data.paymentType}`) : '',
      data.paymentAmount ? formatCurrency(data.paymentAmount, 'da', 'dkk') : ''
    ]
  };

  const taskInfo: ContentStack = {
    fontSize: 9,
    margin: [0, 20, 0, 0],
    stack: [
      { text: t('headers.taskInformation'), bold: true },
      { columns: [taskInformationHeaderStack, taskInformationValuesStack] }
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
          stack: [agreementInfo]
        },
        {
          width: '*',
          stack: [taskInfo]
        }
      ]
    },
    ...(data.description
      ? [
          {
            columns: [
              {
                width: '60%',
                stack: [description]
              },
              {
                width: '*',
                stack: []
              }
            ]
          }
        ]
      : [])
  ];

  return pdfPrinter.createPdfKitDocument({
    pageSize: 'A4',
    pageMargins: [40, 20, 40, 60],
    content,
    footer
  });
}

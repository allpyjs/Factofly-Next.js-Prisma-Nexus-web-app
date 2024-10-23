import { ContentStack } from 'pdfmake/interfaces';

const footer: ContentStack = {
  margin: [40, 20, 40, 0],
  alignment: 'center',
  fontSize: 9,
  stack: [
    {
      margin: [0, -40, 0, 20],
      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }]
    },
    'Factofly - Danneskiold-Samsøes Allé 41 - 1434 København K - CVR-nr.: 39781689',
    'Tlf.: +45 71 96 00 54 - E-mail: kontakt@factofly.com - Hjemmeside: www.factofly.com',
    'Bank: Sydbank - Kontonr.:7701 / 0002863064 - IBAN-nr.: DK5477010002863064 - SWIFT-kode: SYBKDK22'
  ]
};

export default footer;

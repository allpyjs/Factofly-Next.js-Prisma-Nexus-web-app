import { NextApiResponse } from 'next';

export default async function sendPdfResult(res: NextApiResponse, pdf: PDFKit.PDFDocument, filename: string) {
  return new Promise((resolve) => {
    const buffers: Uint8Array[] = [];
    pdf.on('data', buffers.push.bind(buffers));
    pdf.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=${filename}`
        })
        .end(pdfData);
      resolve(null);
    });
    pdf.end();
  });
}

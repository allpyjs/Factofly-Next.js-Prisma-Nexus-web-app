import formidable from 'formidable';
import { NextApiRequest } from 'next';
import apiConfig from '~/apiConfig';

type FormFile = {
  filePath: string;
  mimeType: string;
  size: number;
  originalFileName: string;
};

export default function getFileFromRequest(req: NextApiRequest): Promise<FormFile | null> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, maxFileSize: apiConfig.uploads.maxFileSize });
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) {
        return reject(err);
      }

      if (files.file) {
        const { file } = files;
        return resolve({
          filePath: file.filepath,
          mimeType: file.mimetype,
          size: file.size,
          originalFileName: file.originalFilename
        });
      }

      return resolve(null);
    });
  });
}

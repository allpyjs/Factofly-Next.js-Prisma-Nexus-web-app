import { NextApiResponse } from 'next';
import { s3 } from '../utils/awsClient';
import apiConfig from '~/apiConfig';

export default async function streamFileFromS3({
  res,
  key,
  bucket,
  contentType
}: {
  res: NextApiResponse;
  key: string;
  bucket?: string;
  contentType: string;
}) {
  const bucketName = bucket ?? apiConfig.aws.fileUploadBucket;

  try {
    await s3.headObject({ Bucket: bucketName, Key: key }).promise();
  } catch (err) {
    throw Error(`streamFileFromS3.ts: object with key=${key} was not found in ${bucketName}`);
  }
  const response = await s3.getObject({ Bucket: bucketName, Key: key });

  await new Promise<void>((resolve, reject) => {
    response
      .on('error', (err) => {
        reject(err);
      })
      .on('complete', () => resolve())
      .on('httpHeaders', (code, headers) => {
        if (code < 300) {
          res.setHeader('content-type', contentType);
          res.setHeader('content-length', headers['content-length']);
          res.setHeader('last-modified', headers['last-modified']);
        }
      })
      .createReadStream()
      .pipe(res);
  });
}

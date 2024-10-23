import { v4 as uuid } from 'uuid';
import { promises } from 'fs';
import apiConfig from '~/apiConfig';
import { generateChecksum } from '../utils/encryption';
import logger from '~/utils/logger';
import { s3 } from '../utils/awsClient';

const { readFile } = promises;

export default async function uploadFileToS3Bucket(filePath: string) {
  const key = uuid();
  const data = await readFile(filePath);

  const checksum = await generateChecksum(data);

  logger.info(`files/uploadFileToS3Bucket.ts: uploading file to s3 bucket "${filePath}"`);

  const uploadResult = await s3
    .upload({
      Bucket: apiConfig.aws.fileUploadBucket,
      Key: key,
      Body: data
    })
    .promise();

  return { key, location: uploadResult.Location, checksum };
}

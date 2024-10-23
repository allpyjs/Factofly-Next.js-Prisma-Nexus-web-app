import AWS from 'aws-sdk';
import apiConfig from '~/apiConfig';

export const s3 = new AWS.S3({
  accessKeyId: apiConfig.aws.accessKey,
  secretAccessKey: apiConfig.aws.secretAccessKey
});

export default { s3 };

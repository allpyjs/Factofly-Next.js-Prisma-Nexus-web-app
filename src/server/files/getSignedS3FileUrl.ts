import AWS from 'aws-sdk';
import apiConfig from '../../apiConfig';

export default async function getSignedS3FileUrl(key: string): Promise<string> {
  const s3 = new AWS.S3({
    accessKeyId: apiConfig.aws.accessKey,
    secretAccessKey: apiConfig.aws.secretAccessKey
  });

  const url = await new Promise<string>((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: apiConfig.aws.fileUploadBucket,
        Key: key,
        Expires: apiConfig.aws.urlSignatureExpires
      },
      (err, signedUrl) => {
        if (err) reject(err);
        resolve(signedUrl);
      }
    );
  });

  return url;
}

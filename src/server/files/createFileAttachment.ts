import uploadFileToS3Bucket from './uploadFileToS3Bucket';
import prisma from '../utils/prismaClient';
import logger from '~/utils/logger';
import apiConfig from '~/apiConfig';

type CreateFileAttachmentArgs = {
  name: string;
  recordType: string;
  recordId: number;
  filePath: string;
  mimeType: string;
  size: number;
  originalFileName: string;
};

export default async function createFileAttachment({
  name,
  recordType,
  recordId,
  filePath,
  mimeType,
  size,
  originalFileName
}: CreateFileAttachmentArgs) {
  try {
    const upload = await uploadFileToS3Bucket(filePath);

    const blob = await prisma.attachmentBlob.create({
      data: {
        key: upload.key,
        filename: originalFileName,
        contentType: mimeType,
        metadata: JSON.stringify({}),
        serviceName: 'amazon',
        byteSize: size,
        checksum: upload.checksum,
        bucketName: apiConfig.aws.fileUploadBucket
      }
    });

    const attachment = await prisma.attachment.create({
      data: {
        name,
        recordType,
        recordId,
        attachmentBlob: { connect: { id: blob.id } }
      }
    });

    logger.info(
      `files/createFileAttachment.ts: attachment added successfully {id=${attachment.id}, blobId=${blob.id}}`
    );
  } catch (err) {
    logger.error(`Error attaching file: ${err}`);
    throw err;
  }
}

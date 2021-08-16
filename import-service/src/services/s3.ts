import { S3 } from "aws-sdk";

const s3 = new S3({ region: process.env.REGION });

const createSignedUrl = (fileName: string, contentType: string): Promise<string> => {
    const params = {
        Bucket: process.env.BUCKET,
        Key: `${process.env.PREFIX}/${fileName}`,
        Expires: 60,
        ContentType: contentType
    };
    return s3.getSignedUrlPromise('putObject', params)
};

export { createSignedUrl };

import { S3 } from "aws-sdk";
import csvParser from "csv-parser";

const s3 = new S3({ region: process.env.REGION });

const createSignedUrl = (
  fileName: string,
  contentType: string
): Promise<string> => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: `${process.env.PREFIX}/${fileName}`,
    Expires: 60,
    ContentType: contentType,
  };
  return s3.getSignedUrlPromise("putObject", params);
};

const createProducts = (records: any) => {
  const promises = records.map((record) => {
    const params = {
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    };

    const readStream = s3.getObject(params).createReadStream();

    const allRowsData = [];
    return new Promise((resolve, reject) => {
      readStream
        .pipe(csvParser())
        .on("data", (row) => {
          console.log("row", row);
          allRowsData.push(row);
        })
        .on("end", async () => {
          try {
            await copyFileToAnotherFolder(record);
            await deleteFileFromCurrentFolder(record);
          } catch (error) {
            throw error;
          }
          resolve(allRowsData);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  });

  return Promise.all(promises);
};

const copyFileToAnotherFolder = async (record) => {
  console.log("copy record", record);
  const params = {
    Bucket: record.s3.bucket.name,
    CopySource: encodeURI(`${record.s3.bucket.name}/${record.s3.object.key}`),
    Key: record.s3.object.key.replace(
      process.env.PREFIX,
      process.env.NEW_FOLDER
    ),
  };
  return s3.copyObject(params).promise();
};

const deleteFileFromCurrentFolder = async (record) => {
  console.log("delete record", record);
  const paramsToDelete = {
    Bucket: record.s3.bucket.name,
    Key: record.s3.object.key,
  };

  return s3.deleteObject(paramsToDelete).promise();
};

export { createSignedUrl, createProducts };

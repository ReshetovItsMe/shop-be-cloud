import { SQS } from "aws-sdk";

class QueueService {
  queue: SQS;

  constructor() {
    this.queue = new SQS();
  }

  sendMessage = (data) => {
    const sentMessageResult = this.queue
      .sendMessage({
        QueueUrl: process.env.SQS_ENDPOINT,
        MessageBody: JSON.stringify(data),
      })
      .promise();

    return sentMessageResult;
  };
}

export const queue = new QueueService();

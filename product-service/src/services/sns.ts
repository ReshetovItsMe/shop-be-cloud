import { SNS } from 'aws-sdk';

class SnsService {
  sns: SNS;

  constructor() {
    this.sns = new SNS();
  }

  publish = async (message) => {
    const publishResponse = await this.sns
      .publish({
        Message: message,
        TopicArn: process.env.SNS_TOPIC,
      })
      .promise();
    return publishResponse;
  };
}

export const snsService = new SnsService();

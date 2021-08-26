import 'source-map-support/register';
import { S3Event } from "aws-lambda";
import { response } from './utils';
import { createProducts } from '../services/s3';

export const importFileParser = async (event: S3Event) => {
    try {
        console.log(`File created with record`, event.Records);
        const products = await createProducts(event.Records);
        console.log(products);
        return response(200, JSON.stringify(products));
    } catch (e) {
        console.error(e);
        return response(500, JSON.stringify(e.message));
    }
}

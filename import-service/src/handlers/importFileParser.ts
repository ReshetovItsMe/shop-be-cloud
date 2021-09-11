import 'source-map-support/register';
import { S3Event } from 'aws-lambda';
import { response } from './utils';
import { v4 as uuidv4 } from 'uuid';
import { parseProducts } from '../services/s3';
import { isProduct } from '../interfaces/product';
import { queue } from '../services/queue';

export const importFileParser = async (event: S3Event) => {
    try {
        console.log(`File created with record`, event.Records);
        const products = await parseProducts(event.Records);
        console.log("All products", products);
        for (const product of products) {
            product.id = uuidv4();
            if (!isProduct(product)) {
                console.log("Product is not valid in importFileParser", product)
                return response(400, JSON.stringify(product));
            }
            await queue.sendMessage(product)
          }
        console.log(products);
        return response(200, JSON.stringify(products));
    } catch (e) {
        console.log(e);
        return response(500, JSON.stringify(e.message));
    }
}

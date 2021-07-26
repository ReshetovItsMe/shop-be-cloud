import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { response } from './utils';
import { IProduct } from '../database/products';
import { createProduct } from '../services/products';

export const createNewProduct: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const newProduct: IProduct = JSON.parse(event.body);
        const product = await createProduct(newProduct);
        return response(200, JSON.stringify(product));
    } catch (e) {
        return response(400, JSON.stringify(e.message));
    }
}

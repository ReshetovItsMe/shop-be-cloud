import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { response } from './utils';
import { IProduct, isProduct } from '../database/products';
import { createProduct } from '../services/products';

export const createNewProduct: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const newProduct: IProduct = JSON.parse(event.body);
        console.log(`requested post /products with body`, newProduct);
        if (!isProduct(newProduct)) {
            return response(400, 'Data invaild, please check request')
        }
        const product = await createProduct(newProduct);
        return response(200, JSON.stringify(product));
    } catch (e) {
        return e.name == "SyntaxError" ?
            response(400, JSON.stringify(e.message)) : response(500, JSON.stringify(e.message));
    }
}

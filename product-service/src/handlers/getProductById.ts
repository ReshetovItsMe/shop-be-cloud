import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { getOneProductById } from "../services/products";
import { response } from './utils';

export const getProductById: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        console.log(`requested get /products/<id> with id`, event.pathParameters.productId);
        const product = await getOneProductById(event.pathParameters.productId);
        return response(200, JSON.stringify(product));
    } catch (e) {
        return response(500, JSON.stringify(e.message));
    }
}

import 'source-map-support/register';
import { APIGatewayProxyHandler } from "aws-lambda";
import { getProducts } from "../services/products";
import { response } from './utils';

export const getProductsList: APIGatewayProxyHandler = async () => {
    try {
        const products = await getProducts();
        return response(200, JSON.stringify(products));
    } catch (e) {
        return response(200, JSON.stringify(e));
    }
}

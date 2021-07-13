import 'source-map-support/register';
import { APIGatewayProxyHandler } from "aws-lambda";
import { getProducts } from "../services/products";

export const getProductsList: APIGatewayProxyHandler = async () => {
    try {
        const products = await getProducts();
        return {
            statusCode: 200,
            body: JSON.stringify(products)
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        }
    }
}

import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { getOneProductById } from "../services/products";

export const getProductById: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const product = await getOneProductById(event.pathParameters.productId);
        return {
            statusCode: 200,
            body: JSON.stringify(product)
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        }
    }
}

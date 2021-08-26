import 'source-map-support/register';
import { APIGatewayProxyEvent } from "aws-lambda";
import { response } from './utils';
import { createSignedUrl } from '../services/s3';

export const importProductsByCsvFile = async (event: APIGatewayProxyEvent) => {
    try {
        console.log(`requested get /import/<name> with name `, event.queryStringParameters.name);
        if (!event.queryStringParameters.name) {
            return response(400, 'Provide name parameter in /import/<name>');
        }
        const signedUrl: string = await createSignedUrl(event.queryStringParameters.name, 'text/csv');
        return response(200, JSON.stringify(signedUrl));
    } catch (e) {
        console.error(e);
        return response(500, JSON.stringify(e.message));
    }
}

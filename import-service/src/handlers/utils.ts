import { APIGatewayProxyResult } from "aws-lambda";

const response = (statusCode: number, body: string): APIGatewayProxyResult => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    },
    body
});

export { response };
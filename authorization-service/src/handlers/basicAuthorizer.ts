import 'source-map-support/register';
import { generatePolicy, getCredentialsFromAuthorizationToken } from '../services/auth';

const basicAuthorizer = (event, _, callback) => {
    try {
        console.log(`event`, event)
        const { authorizationToken, methodArn } = event;

        if (!authorizationToken) {
            return callback('Unauthorized');
        }

        const { username, password } = getCredentialsFromAuthorizationToken(authorizationToken);

        if (
            process.env[username] &&
            process.env[username] === password
        ) {
            const passwordFromEnv = process.env[username];
            const access = !passwordFromEnv || passwordFromEnv !== password ? 'Deny' : 'Allow';
            const policy = generatePolicy(username, methodArn, access);
            callback(null, policy)
        }
    } catch (error) {
        console.log(error)
        return callback('Error in the authorizer');
    }
}

export { basicAuthorizer }
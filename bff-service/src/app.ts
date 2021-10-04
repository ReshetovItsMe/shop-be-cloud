import * as express from 'express';
import axios, { AxiosRequestConfig, Method } from 'axios';
import * as cors from 'cors';
import checkRoute from './middleware/checkRoute';


process
    .on('unhandledRejection', (reason) => {
        console.error('Unhandled Rejection at Promise:');
        console.error(reason);
    })
    .on('uncaughtException', (err: Error) => {
        console.error('Uncaught Exception thrown:');
        console.error(err);
        process.exit(1);
    });


const app = express();
const port = process.env.PORT || 4001;

const init = async () => {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });
};

app.use(express.json());

app.use(cors());
app.use(checkRoute);
app.all('/*', async (req, res, next) => {
    const recipient = req.originalUrl.split("/")[1];
    const recipientUrl = process.env[recipient];

    const axiosConfig: AxiosRequestConfig = {
        method: req.method as Method,
        url: `${recipientUrl}`,
        ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };
    console.log("axiosConfig", axiosConfig);
    try {
        const response = await axios(axiosConfig);
        res.json(response.data);
    } catch (error) {
        console.log("error:", JSON.stringify(error));
        if (error.response) {
            const { status, data } = error.response;
            res.status(status).json(data);
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

init();

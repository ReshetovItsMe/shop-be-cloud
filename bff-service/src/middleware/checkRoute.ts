import { Response, Request, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    console.log("originalUrl", req.originalUrl);
    console.log("method", req.method);
    console.log("body", req.body);

    const recipient = req.originalUrl.split("/")[1];
    console.log("recipient", recipient);
    const recipientUrl = process.env[recipient];
    console.log("recipientUrl", recipientUrl);

    if (recipientUrl) {
        next();
    } else {
        res.status(502).json({ error: "Cannot process request" });
    }
};

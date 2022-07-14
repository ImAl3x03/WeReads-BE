import express, { Router, Request, Response } from "express";
import Log from '../log/log';

let router: Router = express.Router();
let log = new Log();

router.get("/", (req: Request, res: Response) => {
    let { username, password } = req.query;

    if (username === process.env.ADMIN && password === process.env.PASSWORD) {
        if (!log.exist()) {
            log.create();
            log.warning("File not found on request");
            return res.status(500).send("File not found");
        }

        log.info("File sent")
        return res.status(200).download(log.path);
    }

    log.error(`Wrong credentials \nUsername: ${username} \nPassword: ${password}`);
    return res.status(401).send("Username or password not valid")
})

export default router;

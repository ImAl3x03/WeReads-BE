import express, {Router, Request, Response} from "express";
import Log from '../log/log';

let router: Router= express.Router();
let log = new Log();

router.get("/", (req: Request, res: Response) => {
    let {username, password} = req.query;

    if(username === process.env.ADMIN && password === process.env.PASSWORD) {
        return res.status(200).download(log.path);
    }    

    return res.status(401).send("Username or password not valid")
})

export default router;

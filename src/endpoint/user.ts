import express, { Router, Request, Response } from "express";
import Log from '../log/log';
import { collection } from '../db/database';
import UserModel from '../model/user.model';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import crypto from 'crypto';
import { isImportEqualsDeclaration } from "typescript";

config();

let router: Router = express.Router();
let log = new Log();
let key: string = process.env.TOKEN ?? "";

router.get("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    log.info(`Authentication method required from ${username}`);

    let result = await collection.findOne<UserModel>({ username: username })

    if(result === null || result === undefined) {
        log.warning("User not found");
        
        return res.status(404).json({ mesage: "Username or password not correct"});
    }

    let hash: string = crypto.pbkdf2Sync(password, result.salt, 1000, 64, 'sha512').toString("hex");

    if(result.hash !== hash) {
        log.warning("Password not valid")

        return res.status(401).json({ message: "Username or password not correct" });
    }

    let token = jwt.sign({}, key);

    log.info("User successfully logged in");

    return res.json({jwt: token});
})

export default router;

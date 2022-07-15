import express, { Router, Request, Response } from "express";
import Log from '../log/log';
import { collection } from '../db/database';
import UserModel from '../model/user.model';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import crypto from 'crypto';
import { ObjectId } from "mongodb";

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

    let token: string = jwt.sign({}, key);

    log.info("User successfully logged in");

    return res.json({jwt: token});
})

router.post("/register", async (req: Request, res: Response) => {
    const {name, lastname, username, password} = req.body;

    log.info(`Registration request from ${name} ${lastname} with ${username} as username`)

    let user: UserModel | null = await collection.findOne<UserModel>({ username: username });

    if(user !== null && user !== undefined) {
        log.warning(`Username ${username} already taken`);
        
        return res.status(400).json({ message: "Username already taken" })
    }

    let salt: string = crypto.randomBytes(16).toString("hex");
    let hash: string = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex");

    let newUser: UserModel = {
        _id: new ObjectId(),
        name: name,
        lastname: lastname,
        username: username,
        salt: salt,
        hash: hash,
    };

    collection.insertOne(newUser, (err) => {
        if(err) {
            log.error(`Error on inserting ${username} user`);

            return res.status(500).json({ message: "Error on inserting user" });
        }
    })

    let token: string = jwt.sign({}, key);

    log.info(`User ${username} successfully added and logged`);

    return res.status(201).json({ jwt: token });
})

export default router;

import {config} from "dotenv";
import express from "express";
import LogRouter from './src/endpoint/log';
import Log from './src/log/log';

config();
var app = express();

var log = new Log();

if(!log.exist()) {
    log.create();
}

app.use("/log", LogRouter);

app.listen(process.env.PORT, () => {
    log.info(`Server is listening on port ${process.env.PORT}`);
});

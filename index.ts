import {config} from "dotenv";
import express from "express";
import Log from './src/log/log';
import bodyParser from 'body-parser';

/**********************
 ****** ENDPOINT ******
 **********************/
 import LogRouter from './src/endpoint/log';
 import UserRouter from './src/endpoint/user';

config();
var app = express();

var log = new Log();

if(!log.exist()) {
    log.create();
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use("/log", LogRouter);
app.use("/", UserRouter);

app.listen(process.env.PORT, () => {
    log.info(`Server is listening on port ${process.env.PORT}`);
});

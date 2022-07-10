import {config} from "dotenv";
import express from "express";
import LogRouter from './src/endpoint/log';

config();
var app = express();

app.use("/log", LogRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening");
});

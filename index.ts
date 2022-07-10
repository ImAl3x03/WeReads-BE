import fs from "fs";
import {config} from "dotenv";
import express from "express";

config();
var app = express();

app.get("/", (req: any, res: any) => {

    let filePath = __dirname + "/test.txt";

    //Check if exist
    let exist = fs.existsSync(filePath)

    if (exist) {
        res.download(filePath);
    } else {
        fs.writeFile(filePath, "", (err: any) => console.log("ma va in mona de to mare", err))

        res.send(process.env.TEST);
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is listening");
});

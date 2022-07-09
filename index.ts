require('dotenv').config();

const fs = require("fs");

const express = require("express");
var app = express();

app.get("/", (req, res) => {

    let filePath = __dirname + "/test.txt";

    //Check if exist
    let exist = fs.existsSync(filePath)

    if (exist) {
        res.download(filePath);
    } else {
        fs.writeFile(filePath, "", (err) => console.log("ma va in mona de to mare", err))

        res.send(process.env.TEST);
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is listening");
});

import LogConfig from "./config";
import * as fs from "fs";

class Log extends LogConfig {
    #path: string;
    
    constructor(fileName: string = "log.log") {
        super(fileName);

        this.#path = super.path;
    }

    info: (message: string) => void = (message) => {
        let data = new Date().toLocaleString("it-IT", {timeZone: "Europe/Rome"})
        
        let logMessage: string = `${data} INFO - ${message}`;
        
        fs.appendFile(this.#path, logMessage, (err) => {if(err) throw err;});
    }

    error: (message: string) => void = (message) => {
        let data = new Date().toLocaleString("it-IT", {timeZone: "Europe/Rome"})
        
        let logMessage: string = `${data} ERROR - ${message}`;
        
        fs.appendFile(this.#path, logMessage, (err) => {if(err) throw err;});
    }

    warning: (message: string) => void = (message) => {
        let data = new Date().toLocaleString("it-IT", {timeZone: "Europe/Rome"})
        
        let logMessage: string = `${data} WARNING - ${message}`;
        
        fs.appendFile(this.#path, logMessage, (err) => {if(err) throw err;});
    }
}

export default Log;

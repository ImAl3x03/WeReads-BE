import * as fs from "fs";

class LogConfig {
    #path: string;

    constructor(fileName: string) {
        this.#path = `${__dirname}/${fileName}`;
    }

    get path() {
        return this.#path;
    }

    //Check if the file exist
    exist: () => boolean = () => {
        return fs.existsSync(this.#path);
    }

    //Creation of the file
    create: () => boolean = () => {
        let exist = this.exist();

        if(!exist) {
            fs.writeFile(this.#path, "", (err) => {if(err) throw err;});
            return this.exist();
        }
        
        return true;
    }

    //New file
    newFile: () => boolean = () => {
        let exist = this.exist();

        if(exist) {
            fs.rm(this.#path, (err) => {if(err) throw err;});
            return this.create();
        } else {
            return this.create();
        }
    }
}

export default LogConfig;

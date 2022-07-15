import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import Log from '../log/log';

const log = new Log();
config();

const dbConnectionString: string = process.env.DATABASE_CONNECTION_STRING ?? "";
const dbName: string = process.env.DATABASE ?? "";
const collectionName: string = process.env.COLLECTION ?? "";

const client = new MongoClient(dbConnectionString);

const connect = async () => {
    try {
        log.info("Connecting to database...")
        await client.connect();
        log.info("Database connected");
    } catch (err: any) {
        log.error(`Database connection not provided \n${err.message}`)
    }
}

connect();
let db = client.db(dbName);
let collection = db.collection(collectionName);

export default db;
export { collection };

import { ObjectId } from "mongodb";

export default interface user {
    _id: ObjectId,
    name: string,
    lastname: string,
    username: string,
    salt: string,
    hash: string,
}

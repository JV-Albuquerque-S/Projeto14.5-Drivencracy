import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DATABASE);
    console.log("Database connection established");
} 
catch(error) {
    console.log("Database connection error", error);
}
  
export default db;
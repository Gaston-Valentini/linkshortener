import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const database = async () => {
    try {
        await connect(process.env.DATABASE);
        console.log('Connected to database "linkshortener"');
    } catch (error) {
        console.error("An error occurred in the connection to the database.");
        throw new Error(error);
    }
};

export { database };

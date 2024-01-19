import { connect } from "mongoose";
import { app } from "../app/app.js";

const database = async () => {
    try {
        await connect(app.get("DATABASE"));
        console.log('Connected to database "linkshortener"');
    } catch (error) {
        console.error("An error occurred in the connection to the database.");
        throw new Error(error);
    }
};

export { database };

import { app } from "./app/app.js";
import { database } from "./database/database.js";
import dotenv from "dotenv";
dotenv.config();

const startApp = async () => {
    try {
        await database();
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("An error occurred during server initialization.");
        throw new Error(error);
    }
};

startApp();

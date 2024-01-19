import { app } from "./app/app.js";
import { database } from "./database/database.js";

const startApp = async () => {
    try {
        await database();
        app.listen(app.get("PORT"), () => {
            console.log(`Server listening on port ${app.get("PORT")}`);
        });
    } catch (error) {
        console.error("An error occurred during server initialization.");
        throw new Error(error);
    }
};

startApp();

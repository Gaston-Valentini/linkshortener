import { Schema, model } from "mongoose";

const userSchenma = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = model("User", userSchenma);

export { User };

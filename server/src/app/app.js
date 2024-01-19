// Imports
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "../router/authRouter.js";

dotenv.config();
const app = express();

// Settings
app.set("PORT", process.env.PORT);
app.set("DATABASE", process.env.DATABASE);
app.set("JWT", process.env.JWT);

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// Router
app.use("/auth", authRouter);

// Export
export { app };

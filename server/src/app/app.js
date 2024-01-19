// Imports
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Settings
app.set("DATABASE", process.env.DATABASE);
app.set("PORT", process.env.PORT);

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// Export
export { app };

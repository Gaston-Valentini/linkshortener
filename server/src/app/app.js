// Imports
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// Export
export { app };

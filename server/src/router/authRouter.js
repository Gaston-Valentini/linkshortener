import { Router } from "express";
import { register } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", register);

export { authRouter };

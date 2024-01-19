import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { app } from "../app/app.js";

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).json({
                success: false,
                message: "Ya existe un usuario registrado con ese correo electrónico, por favor inicia sesión.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRegistered = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: userRegistered._id }, app.get("JWT"), { expiresIn: "24h" });

        return res.status(200).json({
            success: true,
            message: "Usuario registrado correctamente",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error interno en el servidor",
        });
    }
};

export { register };

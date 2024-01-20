import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { app } from "../app/app.js";
import { validateAuthFields } from "../functions/validateAuthFields.js";

const register = async (req, res) => {
    try {
        // Valida la información de la solicitud
        const validation = validateAuthFields(req.body);

        if (validation.success === false) {
            return res.status(400).json({
                success: false,
                message: validation.message,
            });
        }

        // Extrae los datos del body de la solicitud
        const { username, email, password } = req.body;

        // Comprueba que no exista ya un usuario registrado con ese correo electrónico
        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).json({
                success: false,
                message: "Ya existe un usuario registrado con ese correo electrónico, por favor inicia sesión.",
            });
        }

        //  Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Registra un nuevo usuario
        const userRegistered = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Crea un token
        const token = jwt.sign({ id: userRegistered._id }, app.get("JWT"), { expiresIn: "24h" });

        // Devuelve una respuesta al cliente y el token
        return res.status(200).json({
            success: true,
            message: "Usuario registrado correctamente",
            token,
        });
    } catch (error) {
        // Captura un posible error, lo muestra por consola y devuelve una respuesta al cliente
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error interno en el servidor",
        });
    }
};

const login = async (req, res) => {
    try {
        // Extrae los datos del body de la solicitud
        const { email, password } = req.body;

        // Valida que los campos de la solicitud tengan información
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Complete todos los campos del formulario",
            });
        }

        // Valida que exista un usuario registrado con ese correo electrónico
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({
                success: false,
                message: "Credenciales incorrectas",
            });
        }

        // Valida la contraseña
        const unhashedPassword = await bcrypt.compare(password, userFound.password);

        if (!unhashedPassword) {
            return res.status(400).json({
                success: false,
                message: "Credenciales incorrectas",
            });
        }

        // Crea un token
        const token = jwt.sign({ id: userFound._id }, app.get("JWT"), { expiresIn: "24h" });

        // Devuelve una respuesta al cliente y el token
        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            token,
        });
    } catch (error) {
        // Captura un posible error, lo muestra por consola y devuelve una respuesta al cliente
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error interno en el servidor",
        });
    }
};

export { register, login };

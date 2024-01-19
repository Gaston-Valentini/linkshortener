const validateAuthFields = (data) => {
    // Extrae los datos del body de la solicitud
    const { username, email, password } = data;

    // Valida que los campos estén completos
    if (!username || !email || !password) {
        return {
            success: false,
            message: "Complete todos los campos del formulario",
        };
    }

    // Valida la longitud de los campos
    if (username.length <= 0 || username.length > 20) {
        return {
            success: false,
            message: "El nombre de usuario debe contener entre 1 y 20 caracteres",
        };
    }

    if (password.length <= 0 || password.length > 30) {
        return {
            success: false,
            message: "La contraseña debe contener entre 1 y 30 caracteres",
        };
    }

    // Valida que los campos cumplan con las expresiones regulares
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

    if (!emailRegex) {
        return {
            success: false,
            message: "Escriba un formato de correo electrónico",
        };
    }

    if (!passwordRegex) {
        return {
            success: false,
            message: "La contraseña debe contener al menos 8 caracteres, una letra mayúscula y una letra minúscula",
        };
    }

    // Han pasado todas las validaciones de campos
    return {
        success: true,
    };
};

export { validateAuthFields };

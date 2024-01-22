import style from "./Register.module.css";
import image from "../../assets/images/register.png";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    // Estado de términos y condiciones de uso
    const [terms, setTerms] = useState(false);
    const handleTerms = () => {
        setTerms(!terms);
    };

    // Estado de contraseña visible
    const [eye, setEye] = useState(false);
    const handleEye = () => {
        setEye(!eye);
    };

    // Actualiza los estilos de los inputs al hacer fous y blur
    const handleInputFocus = (name) => {
        const section = document.querySelector(`#${name}`);
        section.style.border = "2px solid var(--violet)";
        section.style.backgroundColor = "white";
        const input = section.querySelector("input");
        input.style.backgroundColor = "white";
    };

    const handleInputBlur = (name) => {
        const section = document.querySelector(`#${name}`);
        section.style.border = "2px solid var(--lightGrey)";
        section.style.backgroundColor = "var(--lightGrey)";
        const input = section.querySelector("input");
        input.style.backgroundColor = "var(--lightGrey)";
    };

    return (
        <section className={style.container}>
            <div className={style.content}>
                <div className={style.image}>
                    <img src={image} />
                </div>
                <div className={style.data}>
                    <div className={style.dataTitles}>
                        <h2 className={style.dataTitlesTitle}>Registro</h2>
                        <p className={style.dataTitlesText}>Crea una cuenta y empieza a utilizar la plataforma</p>
                    </div>
                    <form className={style.dataForm}>
                        <div className={style.dataFormSection} id="registerUser">
                            <FaUser className={style.dataFormSectionIcon} />
                            <input
                                type="text"
                                placeholder="Usuario..."
                                name="registerUser"
                                className={style.dataFormSectionInput}
                                onFocus={() => handleInputFocus("registerUser")}
                                onBlur={() => handleInputBlur("registerUser")}
                            />
                        </div>
                        <div className={style.dataFormSection} id="registerEmail">
                            <MdEmail className={style.dataFormSectionIcon} />
                            <input
                                type="email"
                                placeholder="Correo..."
                                name="registerEmail"
                                className={style.dataFormSectionInput}
                                onFocus={() => handleInputFocus("registerEmail")}
                                onBlur={() => handleInputBlur("registerEmail")}
                            />
                        </div>
                        <div className={style.dataFormSection} id="registerPassword">
                            <FaKey className={style.dataFormSectionIcon} />
                            <input
                                type={eye ? "text" : "password"}
                                placeholder="Contraseña..."
                                name="registerPassword"
                                className={style.dataFormSectionInput}
                                onFocus={() => handleInputFocus("registerPassword")}
                                onBlur={() => handleInputBlur("registerPassword")}
                            />
                            {eye ? (
                                <FaEyeSlash className={style.dataFormSectionEye} onClick={handleEye} />
                            ) : (
                                <FaEye className={style.dataFormSectionEye} onClick={handleEye} />
                            )}
                        </div>
                        <div className={style.dataFormTerms}>
                            <label className={style.dataFormTermsText}>
                                He leido y acepto los <Link to={"#"}>Términos y Condiciones</Link>
                            </label>
                            <label className={style.dataFormTermsSwitch}>
                                <input type="checkbox" checked={terms} onChange={handleTerms} />
                                <span className={style.dataFormTermsSwitchSlider}></span>
                            </label>
                        </div>
                        <input type="submit" value="Registrarse" className={style.dataFormSubmit} />
                    </form>
                </div>
            </div>
        </section>
    );
}

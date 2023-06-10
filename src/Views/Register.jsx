import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logochefcito from "../img/hamburguesafinal.png";
import { postRegisterUser } from "../Redux/actions";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const siteKey = process.env.REACT_APP_CAPTCHA_SITEKEY;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isRecaptchaValid, setRecaptchaValid] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "user",
  });

  const handleRecaptchaChange = (value) => {
    // Verificar si el valor del CAPTCHA es válido
    if (value) {
      setRecaptchaValid(true);
    } else {
      setRecaptchaValid(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const newErrors = {};

    // Validar campo de nombre
    if (!form.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (form.name.length > 20) {
      newErrors.name = "El nombre debe tener como máximo 20 caracteres";
    }

    // Validar campo de email
    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      newErrors.email = "El email no es válido";
    } else if (form.email.length > 30) {
      newErrors.email = "El email debe tener como máximo 30 caracteres";
    }

    // Validar campo de contraseña
    if (!form.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (form.password.length > 20) {
      newErrors.password = "La contraseña debe tener como máximo 20 caracteres";
    }

    setErrors(newErrors);

    // Si no hay errores, enviar el formulario
    if (Object.keys(newErrors).length === 0) {
      if (!isRecaptchaValid) {
        // Mostrar un mensaje de error o tomar alguna acción adicional
        return;
      }
      dispatch(postRegisterUser(form));
      setForm({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-screen  flex-col lg:flex-row justify-center items-center">
      <img
        className="w-35 h-36 lg:h-96 lg:mb-4"
        src={logochefcito}
        alt=""
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md lg:ml-96 mt-6 rounded-xl px-6 py-8 lg:w-96 lg:mt-14 lg:p-10"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Registrarse</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2">
            Nombre:
          </label>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            className="bg-slate-100 py-2 px-4 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2">
            Email:
          </label>
          <input
            type="email"
            placeholder="Ingrese su Email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
            className="bg-slate-100 py-2 px-4 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            required
            className="bg-slate-100 py-2 px-4 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="captcha-container mx-auto">
          <ReCAPTCHA
            className="transform scale-75"
            onChange={handleRecaptchaChange}
            sitekey="6LfVmHgmAAAAACsWkbsl8bQx_9ZYBeStY1MQx7Y2"
          />
        </div>
        {isFormSubmitted && !isRecaptchaValid && (
          <p className="text-red-600">Por favor, completa el CAPTCHA.</p>
        )}
        <button
          type="submit"
          className="flex mt-4 items-center text-center justify-center w-full md:w-56 text-white bg-orange-500 rounded-2xl"
        >
          Registrarse
        </button>
        <hr className="my-4" />
        <Link to={"/login"}>
          <p className="font-extralight text-gray-500 text-center">
            ¿Ya tienes una cuenta? Ingresa aquí
          </p>
        </Link>
      </form>
    </div>
  );
}

export default Register;

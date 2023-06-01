import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logochefcito from "../img/hamburguesafinal.png";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { app } from "../Firebase.config";
function Login() {
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

 
 
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validar campo de email
    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      newErrors.email = "El email no es válido";
    } else if (form.email.length > 20) {
      newErrors.email = "El email debe tener como máximo 20 caracteres";
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
      setForm({
        email: "",
        password: "",
      })
      // Aquí enviaríamos el formulario
    }
    
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
      
        navigate("/home");
      }
    });

    return () => {
      // Limpiar el event listener al desmontar el componente
      unsubscribe();
    };
  }, [firebaseAuth, navigate]);


  const handleLogin = async () => {
    try {
      
      await setPersistence(firebaseAuth, browserSessionPersistence);

      // Iniciar sesión con Google
      const response = await signInWithPopup(firebaseAuth, provider);
      console.log(response)

    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return (

    <div className="flex min-h-screen w-screen flex-col lg:flex-row justify-center items-center">
      <img className="w-35 h-36 lg:h-96 lg:mb-4 " src={logochefcito} alt="" />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-10  lg:ml-96 lg:mt-22  lg:mb-32   py-8 lg:w-96 lg:mt-14 lg:p-16"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Ingresar</h1>
        <div className="mb-6 lg:ml-4">
          <button onClick={handleLogin}  className="bg-blue-500 w-56 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <div className=" flex items-center justify-center items-center"></div>
            Sign in with Google
          </button>
        </div>
        <div className="mb-6 lg:ml-4">
          <button className="bg-blue-800 w-56 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            <div className="flex items-center justify-center"></div>
            Sign in with Facebook
          </button>
        </div>
        <p className="text-center">ingresa con email</p>
        <div className="flex flex-col mb-6">
          <label htmlFor="email" className="mb-2 flex items-center">
            Email:
          </label>
          <input
            type="email"
            placeholder="escribe tu email"
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
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-2">
            Password:
          </label>
          <input
            type="password"
            placeholder="escribe tu contraseña"
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
        <button
          type="submit"
          className="flex items-center text-center justify-center w-56  text-white bg-orange-500 rounded-2xl lg:ml-3"
        >
          Ingresar
        </button>
        <hr />
        <Link to={"/register"}>
          <p className="font-extralight text-center">
            No tienes cuenta? crea una aqui.
          </p>
        </Link>
      </form>
    </div>
  
  );
}

export default Login;

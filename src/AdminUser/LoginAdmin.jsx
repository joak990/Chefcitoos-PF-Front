import React, { useEffect, useState } from "react";
import {useNavigate,Link } from "react-router-dom";
import logochefcito from "../img/hamburguesafinal.png";


import { useDispatch } from "react-redux";
import { LoginAdminValidate, postLoginUser,  } from "../Redux/actions";

const validation = (form)=>{
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
return newErrors 
}
function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    type:"admin"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors(validation({ 
      ...form,[name]:value,
    }))
    
  };
  const handleSubmit = (event) => {
    event.preventDefault();


    dispatch(LoginAdminValidate(form))
      .then((response) => {
     console.log("_____",response);
        if (response.validate === true) {
          localStorage.setItem("user", JSON.stringify(response.user));
         
          navigate("/admin/account=successfully");
        } else {
          alert("los datos son incorrectos")
        }
      })
      .catch((error) => {
        // Manejar el error en caso de fallo en la acción postLoginUser
        console.error("Error en el inicio de sesión:", error);
      });
  };
useEffect(() => {
});
  return (
    <div className="bg-black flex min-h-screen w-screen flex-col lg:flex-row justify-center items-center">
      <img className="w-35 h-36 lg:h-96 lg:mb-4 " src={logochefcito} alt="" />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-10  lg:ml-96 lg:mt-22  lg:mb-32   py-8 lg:w-96 lg:mt-14 lg:p-16"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Ingresar</h1>
        <div className="mb-6 lg:ml-4">
      
    </div>
        
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
        <Link to="/login">
        <div> <p className=" hover:bg-gray-300 mr-6 text-sm text-gray-500 flex justify-center mt-2">Ingreso para usuarios aqui</p></div>
        
        </Link>
      </form>
      
     
    </div>
  );
}

export default LoginAdmin;

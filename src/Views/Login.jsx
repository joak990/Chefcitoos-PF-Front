import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logochefcito from "../img/hamburguesafinal.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { app, auth } from "../Firebase.config";
import { useDispatch } from "react-redux";
import { postLoginUser, postRegisterUser, sendRegisterMail } from "../Redux/actions";
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2'
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

  
function Login() {
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
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
    setErrors(validation({ 
      ...form,[name]:value,
    }))
    
  };
  const handleSubmit = (event) => {
    event.preventDefault();


    dispatch(postLoginUser(form))
      .then((response) => {
     // console.log("adentrooo");
      // if (!Object.keys(response)){
      //   navigate("/")
      // }
        if (response.success === true) {
          localStorage.setItem("user", JSON.stringify(response.user));
          // Si la respuesta es true, el inicio de sesión fue exitoso
          // Redireccionar al Home
          navigate("/");
        } else {
          Swal.fire({
            title: 'Los datos son incorrectos',
            icon: 'error',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
            }
          })
          //alert("los datos son incorrectos")
        }
      })
      .catch((error) => {
        // Manejar el error en caso de fallo en la acción postLoginUser
        console.error("Error en el inicio de sesión:", error);
      });
  };
// const userSession = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        navigate("/");
      }else{
        const email = localStorage.getItem("email");
        const id = localStorage.getItem("id");
        //console.log('email', email);
        //console.log('id', id);

        if (email && id) {
          // Redireccionar automáticamente al Home
          navigate("/");
        }
      }
     
    });
    

    return () => {
      // Limpiar el event listener al desmontar el componente
      unsubscribe();
    };
  }, [firebaseAuth, navigate]);
  

  const handleLogin = async () => {
    await setPersistence(firebaseAuth, browserSessionPersistence);
    const response = await signInWithPopup(firebaseAuth, provider);
    
    const datauser = {
      name: response.user.displayName,
      email: response.user.email,
      uid: response.user.uid,
      type: "user",
    };
 
    dispatch(postRegisterUser(datauser));
    dispatch(sendRegisterMail(response.user.email))
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
      <button
        onClick={handleLogin}
        className="bg-blue-500 w-56 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <FcGoogle className="text-2xl mr-2" />
        <span>Sign in with Google</span>
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

import React from 'react'
import { Link } from 'react-router-dom'
import logochefcito from "../img/LogoChefcitoos.png"
function Login() {
  return (
    <div className="flex mt-7 lg:mt-10 flex-col justify-center items-center h-screen">
      
        <img className=' w-35 h-24 lg:mt-7' src={logochefcito} alt="" />
      <form className="bg-white shadow-md rounded-lg px-10 py-8 lg:w-96 lg:mt-14 lg:p-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Ingresa!</h1>
        <div className="mb-6 lg:ml-4">
          <button className="bg-blue-500 w-56 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <div  className=" flex items-center justify-center items-center">
          
            </div>
           Sign in with Google
          </button>
          
        </div>
        <div className="mb-6 lg:ml-4">
          <button  className="bg-blue-800 w-56 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            <div className="flex items-center justify-center">
              
            </div>
            Sign in with Facebook
          </button>
        </div>
        <p className="text-center">Or</p>
        <div className="flex flex-col mb-6">
          <label htmlFor="email" className="mb-2 flex items-center">
            Email:
          </label>
          <input
            type="email"
            placeholder="escribe tu email"
            name="email"
            //value={email}
            required
            className="bg-slate-300 py-2 px-4 rounded"
          />
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-2">
            Password:
          </label>
          <input
            type="password"
            placeholder="escribe tu contraseña"
            name="password"
           // value={password}
            required
            className="bg-slate-300 py-2 px-4 rounded"
          />
        </div>
        <button type="submit" className="flex items-center text-center justify-center w-56  text-white bg-orange-500 rounded-2xl lg:ml-4">
          Ingresar
        </button>
        <hr />
        <Link to={"/register"}>
          <p className="font-extralight text-center">No tienes cuenta?
          crea una aqui.</p>
        </Link>
      </form>
      <div>
       
      </div>
    </div>
  )
}

export default Login

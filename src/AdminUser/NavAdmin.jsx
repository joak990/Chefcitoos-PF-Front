import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/LogoChefcitoos.png"

const NavAdmin = () => {
  const handlelogout = () => {
    localStorage.removeItem("id");
  };

  return (
    <header className="bg-orange-100">
      <nav className="flex items-center justify-center lg:h-20 md:h-20 h-32 px-4 w-full">
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row lg:flex-row  justify-center items-center mt-3">
            <img className="md:w-28 lg:w-28 mr-8 hidden lg:inline-flex md:inline-flex" src={logo} alt="logo" />
            <Link to="/admin/account=successfully">
              <button className="mr-4 text-orange-600 hover:border-b border-orange-600 mb-1">Dashboard</button>
            </Link>
            <Link to="/admin/users">
              <button className="mr-4 text-orange-600 hover:border-b border-orange-600 mb-1">Usuarios</button>
            </Link>
            <Link to="/admin/creations">
              <button className="mr-4 text-orange-600 hover:border-b border-orange-600 mb-1">Comentarios</button>
            </Link>
            <Link to="/admin/products">
              <button className="mr-4 text-orange-600 hover:border-b border-orange-600 mb-1">Productos</button>
            </Link>
          </div>
        </div>
        <div className="ml-auto">
          <Link to="/admin">
            <button onClick={handlelogout} className="rounded-lg w-24 h-9 hover:bg-orange-900 bg-orange-600 text-white">Logout</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavAdmin;

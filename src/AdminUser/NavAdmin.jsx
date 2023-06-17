import React from "react";
import { Navigate, Link } from "react-router-dom";

const NavAdmin = () => {
  const handlelogout = () => {
    localStorage.removeItem("id");
  };

  return (
    <header className="bg-blue-500">
      <nav className="flex items-center justify-center h-16 px-4">
        <div className="flex justify-center">
          <div className="flex justify-center">
            <Link to="/admin/account=successfully">
              <button className="mr-4 text-white hover:text-gray-300">Dashboard</button>
            </Link>
            <Link to="/admin/users">
              <button className="mr-4 text-white hover:text-gray-300">Administrar usuarios</button>
            </Link>
            <Link to="/admin/creations">
              <button className="mr-4 text-white hover:text-gray-300">Administrar comentarios</button>
            </Link>
            <Link to="/admin/products">
              <button className="mr-4 text-white hover:text-gray-300">Gestionar productos</button>
            </Link>
            <Link to="/admin/addproducts">
              <button className="mr-4 text-white hover:text-gray-300">Añadir  Productos</button>
            </Link>
          </div>
        </div>
        <div className="ml-auto">
          <Link to="/admin">
            <button onClick={handlelogout} className="rounded-lg w-28 h-9 hover:bg-orange-900 bg-orange-600 text-white">Logout</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavAdmin;

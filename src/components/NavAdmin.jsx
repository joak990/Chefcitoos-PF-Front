import React from "react";
import { Navigate,Link } from "react-router-dom";

const NavAdmin = () => {
 const handlelogout = ()=>{
  localStorage.removeItem("id");
  
 }
 
    return (
    <header className="bg-blue-500">
      <nav className="flex items-center justify-start h-16 px-4">
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
        <div className="flex justify-end flex-grow"> 
         <Link to="/admin">       
          <button onClick={handlelogout} className="ml-auto rounded-lg w-28 h-9 hover:bg-orange-900 bg-orange-600 text-white">Logout</button>
          </Link>  
        </div>
      </nav>
    </header>
  );
};

export default NavAdmin;

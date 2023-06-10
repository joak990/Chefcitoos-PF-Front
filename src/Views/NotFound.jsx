import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="https://i.pinimg.com/736x/a7/a4/65/a7a465854ed7d06b4b792da0af9c8fa8.jpg"
        alt="Error"
        className="w-64 h-64 mb-4"
      />
      <h1 className="text-4xl font-bold mb-4 text-center">404 - Página no encontrada</h1>
      <p className="text-xl text-center mb-4">La página que estás buscando no existe.</p>
      <Link to="/">
      <button className="bg-stone-400 px-4 py-2 rounded-md text-white">
        Volver al inicio
      </button>
      </Link>
    </div>
  );
};

export default NotFound;

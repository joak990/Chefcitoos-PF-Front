import React from "react";
import logo from "../img/logo.jpg";

function About() {
  return (
    <div className="text-center mt-8 lg:mt-12">
      <h1 className="text-3xl font-bold mb-4 text-center lg:text-center">Nosotros</h1>
      <div className="flex flex-col lg:flex-row items-center lg:ml-44 lg:flex items-center">
        <div className="bg-orange-100 rounded-lg p-6 shadow-lg lg:h-32">
          <p className="mb-4 lg:mb-0 lg:mr-4 text-lg leading-relaxed text-center lg:text-center">
            Somos una empresa dedicada a la creación de soluciones tecnológicas innovadoras para nuestros clientes.
          </p>
        </div>
        <img src={logo} alt="Logo" className="w-3/4 mt-6 lg:w-1/5 rounded-full lg:ml-32" />
      </div>
    </div>
  );
}

export default About;

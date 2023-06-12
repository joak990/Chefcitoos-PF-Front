import React from "react";
import logo from "../img/logo.jpg";
import logo2 from "../img/logo2.jpg";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function About() {
  return (
    <div className="text-center mt-8 lg:mt-12">
      <h1 className="text-3xl font-bold mb-4 text-center lg:text-center font-bold text-orange-600">La magia detrás de Chefcitoos</h1>
      <div className="flex flex-col lg:flex-row items-center lg:ml-44 lg:flex items-center">
      <div className="bg-orange-100 rounded-lg p-8 shadow-lg lg:h-32 lg:mr-11">
  <p className="mb-4 lg:mb-0 text-lg leading-relaxed text-center lg:text-center overflow-hidden">
    Chefcitoos es un restaurante de comida rápida que se destaca por ofrecer a sus clientes la posibilidad de personalizar sus platos. Con un enfoque en la calidad y accesibilidad, Chefcitoos garantiza que todos los comensales puedan disfrutar de una deliciosa experiencia culinaria.
  </p>
</div>

        <img src={logo} alt="Logo" className="w-3/4 mt-6 lg:w-1/5 rounded-full" />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Nuestro Local</h2>
        <div className="flex flex-col items-center">
        <img src={logo2} alt="Nuestro Local" className="w-44 h-96 rounded-lg transform scale-x-130" />

          <p className="mt-2 text-lg text-center">Visítanos en nuestro local</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Redes Sociales</h2>
        <div className="flex justify-center">
          <a href="https://www.facebook.com/ChefcitoosMadelena/" target="_blank" rel="noopener noreferrer" className="mr-4">
            <FaFacebook className="text-3xl text-blue-700" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="mr-4">
            <FaTwitter className="text-3xl text-blue-500" />
          </a>
          <a href="https://instagram.com/chefcitoos?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl text-pink-500" />
          </a>
        </div>
      </div>
      <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">Desarrolladores</h2>
  <div className="flex flex-col lg:flex-row items-center lg:justify-center">
    <div className="bg-gray-100 rounded-lg p-6 shadow-lg lg:mr-8">
      <p className="mb-4 text-lg leading-relaxed text-center mr-15 font-bold text-orange-600">
        ¡Conoce a nuestro increíble equipo!
        <br />
        <span className="text-black">Andrés Gómez</span>
        <br />
        <span className="text-black">Freddy Herrera</span>
        <br />
        <span className="text-black">Glendy Dugarte</span>
        <br />
        <span className="text-black">Greidy Peña</span>
        <br />
        <span className="text-black">Joaquín Haidar</span>
        <br />
        <span className="text-black">Patrick Murayari</span>
      </p>
    </div>
  </div>
</div>

    </div>
  );
}

export default About;


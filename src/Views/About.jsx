import React from "react";

function About() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="font-bold text-3xl">Nosotros</h1>
        </div>
        <div className="my-4">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
            aspernatur, numquam amet tempora harum voluptatibus enim.
            Perspiciatis sit architecto id, ipsa quia veritatis nemo at! Magnam
            iste expedita facere ea?
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <img src="ruta_de_la_imagen.jpg" alt="Foto" />
      </div>
    </div>
  );
}

export default About;

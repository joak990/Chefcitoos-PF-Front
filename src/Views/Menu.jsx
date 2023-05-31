import React from 'react';
import hamburguesa from "../img/hamburguesa.jpg";
import perritocaliente from "../img/perritocaliente.jpg";

function Menu() {
  return (
    <div className='flex flex-col items-center justify-center mt-24'>
      <h1 className='font-bold text-gray-900 text-2xl mb-4 lg:text-5xl'>Platos Personalizables</h1>
      <div>
        <p className='text-center mt-7'>
          Conviértete en el chef de tus propios platos <br />
          Crea combinaciones deliciosas según tus preferencias
        </p>
      </div>
      <div className='flex flex-col lg:flex-row items-center justify-center mt-8'>
        <div className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center mb-4 lg:mr-4'>
          <img className='w-36 h-36 rounded-full' src={hamburguesa} alt="hamburguesa" />
          <p className='text-center'>Hamburguesa</p>
          <button className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded mt-4'>
            Crear
          </button>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center mb-4 lg:mr-4'>
          <img className='w-36 h-36 rounded-full' src={perritocaliente} alt="perritocaliente" />
          <p className='text-center'>Perrito Caliente</p>
          <button className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded mt-4'>
            Crear
          </button>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center mb-4 lg:mr-4'>
          <img className='w-36 h-36 rounded-full' src={hamburguesa} alt="" />
          <p className='text-center'>Burrito</p>
          <button className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded mt-4'>
            Crear
          </button>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center mb-4'>
          <img className='w-36 h-36 rounded-full' src={hamburguesa} alt="" />
          <p className='text-center'>Sandwich</p>
          <button className='bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded mt-4'>
            Crear
          </button>
        </div>
      </div>
      <div className='mt-8'>
        <h1 className='font-bold text-gray-900 text-4xl sm:text-2xl'>Otros Platos</h1>
      </div>
    </div>
  );
}

export default Menu;

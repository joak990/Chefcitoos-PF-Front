import React from 'react'
import logochefcito from "../img/hamburguesafinal.png"

export default function Detail() {
  
    
  return (
    <div>
        <h3 className='text-gray-900 font-bold text-center text-5xl mt-6 mb-6'>Detalle de tu creación</h3>
            <div className='flex flex-col items-center justify-start w-full md:px-20'>
              
        <h2>Nombre de producto</h2>
        <h4>Nombre de Usuario</h4>
        <img className="w-35 h-36 lg:h-96 lg:mb-4 " src={logochefcito} alt="" />
        
        <h2>ingredientes</h2>
        <div>
            <h1>Comentarios</h1>
            <p>cndshjfdbssdbfhjfdsfbdhbfsbchgdsvcbdndsvfhjsdfhjfdvhjsdyudfgdsjfjfdvjhdjkvhjdxbjvhjdcdvdvsdcgsdvcgsd</p>
        </div>
            </div>
        
    
    </div>
  )
}

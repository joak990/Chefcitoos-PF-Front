import React from 'react'
import SeacrhBar from '../components/SeacrhBar'

function Creaciones() {
  return (
    <div className='flex flex-col items-center justify-start w-full md:px-20'>
      <button className="bg-orange-600 w-36 h-12 text-white rounded-xl font-bold self-end mt-6">
            Nueva Creación
          </button>
      <h3 className='text-gray-900 font-bold text-5xl mt-6 mb-6'>Tus Creaciones</h3>
      <div className='flex flex-row flex-wrap p-5'>
      <SeacrhBar></SeacrhBar>
      </div>
      <div class="space-x-4">
      <button className="bg-orange-600 w-36 h-12 text-white rounded-xl font-bold self-end mt-6">Todas</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold self-end mt-6">Hamburguesa</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold self-end mt-6">Perro Caliente</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold self-end mt-6">Sandwich</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold self-end mt-6">Burrito</button>
      </div>
    </div>
    
  )
}

export default Creaciones

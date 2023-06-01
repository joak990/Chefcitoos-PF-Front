import React from 'react'
import Card from '../components/Card';
import { useUser } from '../useUser';

export default function Publicaciones() {
  const userstorage = useUser(); 
  const burgers = [
        {
          id: 1,
          image: "ruta/imagen1.jpg",
          name: "Hamburguesa Clásica",
          description: "Una deliciosa hamburguesa con ingredientes frescos y jugosa carne de res.",
          ratingValue: 4.5,
          price: 8.99
        },
        {
          id: 2,
          image: "ruta/imagen2.jpg",
          name: "Hamburguesa con Queso",
          description: "Una hamburguesa con queso fundido y carne jugosa, perfecta para los amantes del queso.",
          ratingValue: 4.2,
          price: 9.99
        },
        {
          id: 3,
          image: "ruta/imagen3.jpg",
          name: "Hamburguesa Vegetariana",
          description: "Una opción saludable y deliciosa, hecha con una mezcla de vegetales frescos y legumbres.",
          ratingValue: 4.0,
          price: 7.99
        },
        {
          id: 4,
          image: "ruta/imagen3.jpg",
          name: "Hamburguesa Chefcitoos",
          description: "Una opción saludable y deliciosa, hecha con una mezcla de vegetales frescos y legumbres.",
          ratingValue: 4.0,
          price: 7.99
        },
      ];
  return (
    <div className='flex flex-col items-center justify-start w-full md:px-20'>
   
    <h3 className='text-gray-900 font-bold text-4xl mt-6 mb-6'>Explora y conoce nuestra comunidad</h3>
    <div className='flex flex-row flex-wrap p-5'>
    </div>
    <div class="space-x-4">
    <button className="bg-orange-600 w-36 h-12 text-white rounded-xl font-bold mt-6">Todas</button>
    <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Hamburguesa</button>
    <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Perro Caliente</button>
    <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Sandwich</button>
    <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Burrito</button>
    <select defaultValue={"DEFAULT"} className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6"> Precio
      <option value="DEFAULT" disabled className="text-center">Precio</option>
      <option value="asc">Menor Pecio</option>
      <option value="desc">Mayor Precio</option>
    </select>
    </div>
    <div  className='flex flex-row flex-wrap justify-center gap-8 pb-6'>
        {burgers.map((burger)=>
         <Card  
         key={burger.id}
            id={burger.id}
            image={burger.image}
            name={burger.name}
            description= {burger.description}
            ratingValue={burger.ratingValue}
            price={burger.price}
            
          />
          
         
         )}
       
      
      </div>

    
  </div>
  )
}

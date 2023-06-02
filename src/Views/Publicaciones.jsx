import React from 'react'
import { useUser } from '../useUser';
import { useSelector } from 'react-redux';
import CardCreations from '../components/cardCreations';



export default function Publicaciones() {
  const userstorage = useUser(); 
  const allCreations = useSelector((state) => state.allCreations);
 
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
        {allCreations&&
        allCreations.map((elem)=>{
          <CardCreations
         key={elem.product_id}
            image={elem.image}
            name={elem.name}
            user={elem.users_id}
          />
        }
         
          
         
         )}
       
      
      </div>

    
  </div>
  )
}

import React, { useEffect } from 'react'
import { useUser } from '../useUser';
import {useDispatch,useSelector } from 'react-redux';
import CardCreations from '../components/CardCreations';
import { getCreations, getPublicacionesFilters , getPublicacionesFilterPrice } from '../Redux/actions';



export default function Publicaciones() {
  const userstorage = useUser(); 
  const allCreations = useSelector((state) => state.allCreations);
 
 
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getCreations())
  }, [dispatch])

  const HandleButton = (event) => {
    const value = event.target.value;
    console.log(value);
    dispatch(getPublicacionesFilters(value))
  }

  const HandlePrice = (event)=>{
    const value = event.target.value
    dispatch(getPublicacionesFilterPrice(value))
  }
  
  return (
    <div className='flex flex-col items-center justify-start w-full md:px-20'>
   
    <h3 className='text-gray-900 font-bold text-4xl mt-6 mb-6'>Explora y conoce nuestra comunidad</h3>
    <div className='flex flex-row flex-wrap p-5'>
    </div>
    <div class="space-x-4">
    <button value="Todas" onClick={HandleButton} className="bg-orange-600 w-36 h-12 text-white rounded-xl font-bold mt-6">Todas</button>
    <button value="Burgers" onClick={HandleButton}  className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Hamburguesa</button>
    <button value="HotDogs" onClick={HandleButton} className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Perro Caliente</button>
    <button value="Sandwich" onClick={HandleButton} className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Sandwich</button>
    <button value="Burrito" onClick={HandleButton} className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Burrito</button>
    <select onChange={HandlePrice} defaultValue={"DEFAULT"} className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6"> Precio
      <option value="DEFAULT" disabled className="text-center">Precio</option>
      <option value="priceDesc">Menor Pecio</option>
      <option value="priceAsc">Mayor Precio</option>
    </select>
    </div>
    <div  className='flex flex-row flex-wrap justify-center gap-8 pb-6'>
        {allCreations&&
        allCreations.map((elem)=>{
          return (
          <CardCreations
            key={elem.product_id}
            id= {elem.id}
            product={elem.product.name}
               image={elem.image}
               name={elem.name}
               user={elem.Users.name}
               price={elem.price}
             />)
          
        }
         
          
         
         )}
       
      
      </div>

    
  </div>
  )
}

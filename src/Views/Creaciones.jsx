import React from 'react'
import SeacrhBar from '../components/SeacrhBar'
import Card from '../components/Card'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCreationDetailByUser } from '../Redux/actions';

function Creaciones() {
  
  const {id} = useParams();
  console.log(id);
  const dispatch = useDispatch();
  ;
  const creation = useSelector((state) => state.yourCreations);

 useEffect(() => {
  dispatch(getCreationDetailByUser(id))
}, [dispatch]);
console.log(creation);
    
  
  return (
    <div className='flex flex-col items-center justify-start w-full md:px-20'>
     
      <h3 className='text-gray-900 font-bold text-5xl mt-6 mb-6'>Tus Creaciones</h3>
      <div className='flex flex-row flex-wrap p-5'>
      <SeacrhBar></SeacrhBar>
      </div>
      <div class="space-x-4">
      <button className="bg-orange-600 w-36 h-12 text-white rounded-xl font-bold mt-6">Todas</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Hamburguesa</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Perro Caliente</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Sandwich</button>
      <button className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Burrito</button>
      <select defaultValue={"DEFAULT"} className="bg-gray-300 mr-3 w-36 h-12 text-black rounded-xl font-bold  mt-6"> Precio
        <option value="DEFAULT" disabled className="text-center">Precio</option>
        <option value="asc">Menor Pecio</option>
        <option value="desc">Mayor Precio</option>
      </select>
      </div>
      <div  className='flex flex-row flex-wrap justify-center gap-8 pb-6 mt-5'>
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

export default Creaciones

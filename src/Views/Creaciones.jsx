import React, { useEffect } from 'react'
import SeacrhBar from '../components/SeacrhBar'
import Card from '../components/Card'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCreationDetailByUser , getCreationFilters , getCreationFilterPrice} from '../Redux/actions';
import CardCreations from '../components/CardCreations';

function Creaciones() {
  
  //const {id} = useParams();
  const userId = localStorage.getItem('id')
  const dispatch = useDispatch();
  const creation = useSelector((state) => state.yourCreations);

 useEffect(() => {
  dispatch(getCreationDetailByUser(userId))
}, [dispatch]);
console.log(creation);


  const HandleButton = (event) => {
    const value = event.target.value;
    console.log(value);
    dispatch(getCreationFilters(value))
  }

  const HandlePrice = (event)=>{
    const value = event.target.value
    dispatch(getCreationFilterPrice(value))
  }
  
  return (
    <div className='flex flex-col items-center justify-start w-full md:px-20'>
      <h3 className='text-gray-900 font-bold text-5xl mt-6 mb-6'>Tus Creaciones</h3>
      <div className='flex flex-row flex-wrap p-5'>
      <SeacrhBar></SeacrhBar>
      </div>
      <div class="space-x-4">
      <button value="Todas" onClick={HandleButton} className="bg-orange-600 w-36 h-12 text-white rounded-xl font-bold mt-6">Todas</button>
      <button value="Burgers" onClick={HandleButton} className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Hamburguesa</button>
      <button value="HotDogs" onClick={HandleButton}className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Perro Caliente</button>
      <button value="Sandwich" onClick={HandleButton}className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Sandwich</button>
      <button value="Burrito"  onClick={HandleButton}className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6">Burrito</button>
      <select onChange={HandlePrice} defaultValue={"DEFAULT"} className="bg-gray-300 mr-3 w-36 h-12 text-black rounded-xl font-bold  mt-6"> Precio
        <option value="DEFAULT" disabled className="text-center">Precio</option>
        <option value="priceDesc">Menor Pecio</option>
        <option value="priceAsc">Mayor Precio</option>
      </select>
      </div>
      <div  className='flex flex-row flex-wrap justify-center gap-8 pb-6 mt-5'>
      {creation&&
       creation.map((elem)=>{
          return (
          <CardCreations
            key={elem.product_id}
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

export default Creaciones

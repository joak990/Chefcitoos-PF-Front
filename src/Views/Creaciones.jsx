import React, { useEffect, useState } from 'react'
import SeacrhBar from '../components/SeacrhBar'
import Card from '../components/Card'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCreationDetailByUser , getCreationFilters , getCreationFilterPrice, pageCreations} from '../Redux/actions';
import CardCreations from '../components/CardCreations';
import { Pagination } from '../components/Pagination';

function Creaciones() {
  
  const {id} = useParams();
  const userId = localStorage.getItem('id')
  const dispatch = useDispatch();
  let creation = useSelector((state) => state.yourCreations);
  let page = useSelector((state) => state.numPageCreations);

  // const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(9);
  const maxPage =  Math.ceil (creation.length / perPage);

   console.log('::::creation::::', creation);

 useEffect(() => {
    dispatch(getCreationDetailByUser(userId))

}, [dispatch]);



  const HandleButton = (event) => {
    const value = event.target.value;
    
    dispatch(getCreationFilters(value, userId))
    
  }

  const HandlePrice = (event)=>{
    const value = event.target.value
    dispatch(getCreationFilterPrice(value))
  }
  
  return (
    <div className='flex flex-col items-center justify-start w-full md:px-20'>
      <h3 className='text-gray-900 font-bold text-5xl mt-6 mb-6'>Tus Creaciones</h3>
      <div className='flex flex-row flex-wrap p-5'>
      <SeacrhBar type="creations"></SeacrhBar>
      </div>
      <div class="space-x-4">
      <button value="Todas" onClick={HandleButton} className="bg-orange-600 w-36 h-12 text-white rounded-xl font-bold mt-6 ">Todas</button>
      <button value="Burgers" onClick={HandleButton} className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6 hover:bg-orange-600 hover:text-white">Hamburguesa</button>
      <button value="HotDogs" onClick={HandleButton}className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6  hover:bg-orange-600 hover:text-white">Perro Caliente</button>
      <button value="Sandwitch" onClick={HandleButton}className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6  hover:bg-orange-600 hover:text-white">Sandwich</button>
      <button value="Burrito"  onClick={HandleButton}className="bg-gray-300 w-36 h-12 text-black rounded-xl font-bold  mt-6  hover:bg-orange-600 hover:text-white">Burrito</button>
      <select onChange={HandlePrice} defaultValue={"DEFAULT"} className="bg-gray-300 mr-3 w-36 h-12 text-black rounded-xl font-bold  mt-6  hover:bg-orange-600 hover:text-white"> Precio
        <option value="DEFAULT" disabled className="text-center">Precio</option>
        <option value="desc">Menor Pecio</option>
        <option value="asc">Mayor Precio</option>
      </select>
      </div>
      <div  className='flex flex-row flex-wrap justify-center gap-8 pb-6 mt-5'>
      {creation &&
       creation.slice(
        (page - 1) * perPage,
        (page - 1) * perPage + perPage
      ).map((elem,index)=>{
          return (
          <CardCreations
            key={index}
            id={elem.id}
            product={elem.product.name}
               image={elem.image}
               name={elem.name}
               user={elem.Users.name}
               price={elem.price}
             />)
          
        }       
         )} 
      </div>
      {creation.length > 0 && <Pagination action={pageCreations} page={page} maxPage={maxPage} />}
</div>
   
    
  )
}

export default Creaciones

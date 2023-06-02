import React, { useEffect } from 'react'
import logochefcito from "../img/hamburguesafinal.png"
import { useDispatch, useSelector } from 'react-redux';
import { getCreationDetail } from '../Redux/actions';
import { useParams } from 'react-router-dom';


export default function Detail() {
  
  const {id} = useParams();
  console.log(id);
  const dispatch = useDispatch();
  ;
  const creation = useSelector((state) => state.creationDetail);

 useEffect(() => {
  dispatch(getCreationDetail(id))
}, [dispatch]);
console.log(creation);
    
  return (
    <div>
        <h3 className='text-gray-900 font-bold text-center text-5xl mt-6 mb-6'>Detalle de tu creación</h3>
            <div className='flex flex-col items-center justify-start w-full md:px-20'>
              
        <img className="w-35 h-36 lg:h-96 lg:mb-4 " src={creation?.image} alt="" />
      
       <h2>{creation.product?.name}</h2>
       <h2>{creation?.name}</h2>
       <h4>{creation.Users?.name} </h4>
        <h2>Ingredientes</h2>
        <div>
            <h1>Comentarios</h1>
            <p>cndshjfdbssdbfhjfdsfbdhbfsbchgdsvcbdndsvfhjsdfhjfdvhjsdyudfgdsjfjfdvjhdjkvhjdxbjvhjdcdvdvsdcgsdvcgsd</p>
        </div>
            </div>
        
    
    </div>
  )
}

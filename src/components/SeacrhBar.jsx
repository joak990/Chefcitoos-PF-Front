import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCreationByName, getPublicationName } from '../Redux/actions';

export default function SeacrhBar({type}) {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const userId = localStorage.getItem('id')

  function handleInputChange(e){
    setName(e.target.value)
}
function handleSearch(){
  if (type == 'creations') {
    dispatch(getCreationByName(userId, name))
  }
 else {
  dispatch(getPublicationName(name))

 }
}
const handleKeyUp = (event) => {
  if ( event.keyCode === 13 || event.charCode === 13 ) {
    if (type == 'creations') {
      dispatch(getCreationByName(userId, name))
    }
   else {
    dispatch(getPublicationName(name))
  
   }
   
  }
};




  return (
    <div class="space-x-4">
      <input  type="text" placeholder="Encuentra tu plato" class="border border-gray-300 px-4 py-2"  onKeyUp={handleKeyUp}onChange={(e)=>handleInputChange(e)}></input>
      <button type="submit" className="bg-orange-600 w-20 h-10 text-white rounded-xl font-bold mt-6" onClick = {handleSearch}>Buscar</button>
    </div>
  )
}

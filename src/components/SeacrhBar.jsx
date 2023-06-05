import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cleanPublications, cleanYourCreations, getCreationByName, getCreationDetailByUser, getPublicationName, pageCreations, pagePublications } from '../Redux/actions';

export default function SeacrhBar({type}) {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const userId = localStorage.getItem('id')

  function handleInputChange(e){
    setName(e.target.value)
}
function handleSearch(){
  if (type == 'creations') {
    dispatch(cleanYourCreations());
    dispatch(getCreationByName(userId, name));
    dispatch(pageCreations(1));
  }
 else {
  dispatch(cleanPublications());
  dispatch(getPublicationName(name));
  dispatch(pagePublications(1));

 }
}
const handleKeyUp = (event) => {
  if ( event.keyCode === 13 || event.charCode === 13 ) {
    if (type == 'creations') {
      dispatch(cleanYourCreations());
      dispatch(getCreationByName(userId, name))
      dispatch(pageCreations(1));
    }
   else {
    dispatch(cleanPublications());
    dispatch(getPublicationName(name));
    dispatch(pagePublications(1));
   }
   
  }
};




  return (
    <div class="space-x-4">
      <input  type="text" placeholder="Encuentra tu plato" className="border border-gray-300 px-4 py-2"  onKeyUp={handleKeyUp}onChange={(e)=>handleInputChange(e)}></input>
      <button type="submit" className="bg-orange-600 w-20 h-10 text-white rounded-xl font-bold mt-6" onClick = {handleSearch}>Buscar</button>
    </div>
  )
}

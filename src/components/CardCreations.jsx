import React from "react";



const CardCreations =(props) => {
    
   console.log("------->",props)
  return (
    <div className="bg-white flex flex-col items-center justify-center rounded-3xl w-80  p-8 shadow-md">
     
      <div className="flex flex-col items-center justify-end mb-1 mt-3">
        <div className="flex flex-col gap-3 items-center justify-start w-full">
        <h6 className="text-gray-900 text-2xl font-semibold">{props.name}</h6>
        <h3 className="text-gray-900 text-base font-semibold">{props.user}</h3>
          <h6 className="text-gray-900 text-sm font-semibold">{props.product}</h6>
          
    
        </div>
        <img
        className="mt-1 object-cover h-64 w-64 rounded-full"
        src={props.image}
        alt="creation"
      />
          
        
      </div>
    </div>
  );
};

export default CardCreations;
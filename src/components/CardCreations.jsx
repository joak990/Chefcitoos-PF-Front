import React from "react";


const CardCreations = ({ id, product_id, users_id, image, name}) => {
 
  return (
    <div className="bg-white flex flex-col items-center justify-center rounded-3xl w-80  p-8 shadow-md">
      <img
        className="mt-1 object-cover h-64 w-64 rounded-full"
        src={image}
        alt="creation"
      />
      <div className="flex flex-col items-center justify-end mb-1 mt-3">
        <div className="flex flex-col gap-3 items-center justify-start w-full">
          <h6 className="text-gray-900 text-2xl font-semibold">{name}</h6>
          <h3 className="text-gray-900 text-2xl font-semibold">{users_id}</h3>
          <h6 className="text-gray-900 text-2xl font-semibold">{product_id}</h6>
        </div>
    
        
      </div>
    </div>
  );
};

export default CardCreations;
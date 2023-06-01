import React, { useState } from "react";
import burguer from "../img/hamburguesa.jpg";

function CardMenu({ product, onOrderProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    width: isHovered ? "310px" : "296px",
   
    transition: "width 0.4s ease, height 0.5s ease",
    borderBottom: "1px solid #00000015",
  };

  return (
    <div
      className="flex flex-row justify-center py-1 my-2"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOrderProduct}
    >
      <div className="flex flex-col items-start self-start">
        <h6 className="font-semibold text-md uppercase">{product?.name}</h6>
        <p className="text-gray-700 w-52 text-sm mr-1">{product?.elements}</p>
        <p className="font-semibold text-orange-600 text-lg mt-1">${product?.price}</p>
      </div>
      <div className="flex flex-grow justify-end">
        <img className="rounded-lg object-cover" src={product?.image} alt="" />
      </div>
    </div>
  );
}

export default CardMenu;

import React, { useState } from "react";
import burguer from "../img/hamburguesa.jpg";

function CardMenu({ id, image, name, description, price, onOrderProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    width: isHovered ? "330px" : "296px",
   
    transition: "width 0.4s ease, height 0.5s ease",
    borderBottom: "1px solid #00000015",
  };

  return (
    <div
      className="flex flex-row items-center  justify-center p-8 "
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOrderProduct}
    >
      <div className="flex flex-col">
        <h6 className="font-semibold text-lg">Hamburguesa</h6>
        <p className="text-gray-800"> Pepinillo, tomate, lechuga, mostaza....</p>
        <p className="font-semibold text-orange-600 text-lg mt-2">$28000</p>
        <p className="text-sm"> </p>
      </div>
      <div className="flex flex-grow justify-end">
        <img className="w-32 rounded-lg" src={burguer} alt="" />
      </div>
    </div>
  );
}

export default CardMenu;

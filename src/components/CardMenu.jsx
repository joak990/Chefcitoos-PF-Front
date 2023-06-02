import { faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function CardMenu({ product, onOrderProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    width: isHovered ? "315px" : "296px",

    transition: "width 0.4s ease, height 0.5s ease",
    borderBottom: "1px solid #00000015",
  };

  return (
    <div
      className="flex flex-row justify-center py-1 my-2 hover:cursor-auto"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-start self-start">
        <h6 className="font-semibold text-md uppercase">{product?.name}</h6>
        <p className="text-gray-700 w-48 text-sm mr-1">{product?.elements}</p>
        <p className="font-semibold text-orange-600 text-lg mt-1">
          ${product?.price}
        </p>
      </div>
      <div className="flex flex-col justify-end flex-grow">
        <img
          className="rounded-lg h-24 object-cover"
          src={product?.image}
          alt=""
        />
        <button className="bg-orange-600 rounded-full font-bold flex justify-center self-end px-2 my-2 text-white" onClick={onOrderProduct}>
          Ordenar <FontAwesomeIcon className="p-1 text-white" icon={faPlus} />
        </button>
      </div>
    </div>
  );
}

export default CardMenu;

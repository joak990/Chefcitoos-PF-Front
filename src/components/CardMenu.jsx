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

        <h6 className={` ${product.isDeleted ? "text-gray-500" : "text-black"} font-semibold text-md uppercase`}>{product?.name}</h6>
        <p className="text-gray-700 w-48 text-sm mr-1">{product?.elements}</p>
        {!product.isDeleted &&
          <p className={`${product.isDeleted ? "text-gray-400" : "text-orange-600"} font-semibold text-lg mt-1`}>${product?.price}
          </p>
        }
        {product.isDeleted &&
          <p className="text-red-600">No disponible</p>}
        {product.customizable && !product.isDeleted &&
          <p className=" bg-green-100 text-green-700   px-2 mb-2 ">Personalizable</p>}
        {(!product.customizable && !product.isDeleted) &&
          <p className=" bg-orange-100 text-orange-400 px-2 mb-2  mt-1">No Personalizable</p>}
      </div>
      <div className="flex flex-col justify-center flex-grow">
        <img
          className="rounded-lg h-24 object-cover"
          src={product?.image}
          alt=""
        />
        {!product.isDeleted &&
          <button className="bg-orange-600 rounded-full font-bold flex justify-center self-end px-2 my-2 text-white" onClick={onOrderProduct}>
            Ordenar <FontAwesomeIcon className="p-1 text-white" icon={faPlus} />
          </button>
        }

      </div>
    </div>
  );
}

export default CardMenu;

import React, { useState } from "react";
import RatingStars from "./RatingStars";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCreation, updateCreationQuantity } from "../Redux/actions";
import Swal from 'sweetalert2'


const CardCreations = ({ image, name, user, price, id, average }) => {
  const dispatch = useDispatch();
  const creationsShoppingCart = useSelector((state) => state.shoppingCart.creations);
  const isIdInLocalStorage = localStorage.getItem("id");
  const handleOrderCreation = () => {
    if (creationsShoppingCart.some(creationCurrent => creationCurrent.id === id)) {
      dispatch(updateCreationQuantity({
        quantity: 1, index: creationsShoppingCart.findIndex(creationCurrent => {
          return creationCurrent.id === id
        })
      }))
    } else {
      const creation = {
        image,
        name,
        price,
        id,
        quantity: 1,
      };
      dispatch(addCreation(creation));
    }

    Swal.fire({
      title: 'Producto agregado satisfactoriamente al carrito',
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
      }
    })
  };

  const handlealertbutton = () => {
    Swal.fire({
      title: 'Debes iniciar sesión',
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
      }
    })

    //alert("regis")
  }


  return (
    <div className="bg-white flex flex-col items-center justify-center rounded-3xl w-80 mt-5 p-8 shadow-md">
      <img
        className="mt-1 object-cover h-64 w-64 rounded-full"
        src={image}
        alt="creation"
      />
      <div className="flex flex-col items-center justify-end mb-1 mt-3">
        <div className="flex flex-col gap-3 items-center justify-start w-full">
          <h6 className="text-gray-900 text-2xl font-semibold">{name}</h6>
          <h3 className="text-gray-900 text-base font-semibold">{user}</h3>
          <div className="flex flex-row items-center justify-center mt-3.5 rounded-[1.76px] w-[49%] md:w-full">
          </div>
          <div className="pointer-events-none">
            <RatingStars value={average} />
          </div>

        </div>

        <div className="flex flex-row gap-4 items-center justify-between mt-[30px] rounded-lg w-[95%] md:w-full">
          <span className="font-bold text-xl text-gray_900">${price}</span>
          {isIdInLocalStorage && <button
            className="h-10 rounded-xl cursor-pointer font-bold min-w-[140px] text-base text-center text-white bg-orange-600"
            onClick={handleOrderCreation}>
            Ordenar ahora
          </button>}
          {!isIdInLocalStorage && <button
            className="h-10 rounded-xl cursor-pointer font-bold min-w-[140px] text-base text-center text-white bg-orange-600"
            onClick={handlealertbutton}>
            Ordenar ahora
          </button>}

        </div>
        <div className="flex flex-row justify-center mt-4">
          <Link to={`/detail/${id}`}>
            <button className="cursor-pointer font-bold text-sm text-center text-orange-600">
              Ver más
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardCreations;

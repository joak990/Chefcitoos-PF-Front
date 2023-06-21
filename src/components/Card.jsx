import React from "react";
import RatingStars from "./RatingStars";

const Card = ({ id, image, name, description, ratingValue, price }) => {
  const orderProduct = () => {
    console.log("product");
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center rounded-3xl w-80  p-8 shadow-md">
      <img
        className="mt-1 object-cover h-64 w-64 rounded-full"
        src={image}
        alt="producto"
      />
      <div className="flex flex-col items-center justify-end mb-1 mt-3">
        <div className="flex flex-col gap-3 items-center justify-start w-full">
          <h6 className="text-gray-900 text-2xl font-semibold text-center">{name}</h6>
          <span className="text-center text-gray-800 w-full font-normal text-sm">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

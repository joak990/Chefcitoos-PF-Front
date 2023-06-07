import React from "react";
import ReactStars from "react-stars";

const RatingStars = ({ value, handleRatingChange,disabled = false }) => {

  return (
    <ReactStars
      count={5}
      value={value}
      onChange={handleRatingChange}
      size={24}
      
      color2={disabled ? "#EA580C" : "#EA580C"}
      edit={!disabled}
    />
  );
};

export default RatingStars;
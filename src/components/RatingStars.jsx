import React from "react";
import ReactStars from "react-stars";

const RatingStars = ({ value }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <ReactStars
      count={5}
      value={value}
      onChange={ratingChanged}
      size={24}
      color2={"#EA580C"}
    />
  );
};

export default RatingStars;

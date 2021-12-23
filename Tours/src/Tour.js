import React, { useState } from "react";
const Tour = ({ id, image, info, price, name }) => {
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <foter>
        <div className="tour-side">
          <h4>{name}</h4>
        </div>
      </foter>
    </article>
  );
};

export default Tour;

import React from "react";
import { NavLink } from "react-router-dom";

import "../CSS/productCard.css";

const ProductCard = ({ jewel }) => {
  return (
    <div className="productcard-main-container">
      <NavLink to={`/product/${jewel._id}`} className="product-card-wrapper">
        <img
          src={`http://localhost:3000/${jewel.productImage[0]}`}
          className="jewel-image"
          alt="gegold production"
        />
        <div className="jewel-description"> {jewel.name} </div>
        <div className="jewel-price"> {`${jewel.price} ლარი`} </div>
      </NavLink>
    </div>
  );
};

export default ProductCard;

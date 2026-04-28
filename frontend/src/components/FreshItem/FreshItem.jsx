import React, { useContext } from "react";
import "./FreshItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FreshItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="fresh-item">
      <div className="fresh-item-img-container">
        <img src={url+"/images/"+image} className="fresh-item-image" alt={name} />
      </div>

      <div className="fresh-item-content">
        <h3 className="fresh-item-name">{name}</h3>
        <p className="fresh-item-description">{description}</p>
        <div className="fresh-item-bottom">
          <p className="fresh-item-price">₹{price}</p>

          {!cartItems[id] ? (
            <button className="add-btn" onClick={() => addToCart(id)}>
              Add to Cart
            </button>
          ) : (
            <div className="item-counter">
              <button onClick={() => removeFromCart(id)}>-</button>
              <span>{cartItems[id]}</span>
              <button onClick={() => addToCart(id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreshItem;

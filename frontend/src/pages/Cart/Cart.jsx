// Cart.jsx
import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, fresh_list, removeFromCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  const cartItemsArray = fresh_list.filter(item => cartItems[item._id]);
  const isEmpty = cartItemsArray.length === 0;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-count">{cartItemsArray.length} {cartItemsArray.length === 1 ? 'item' : 'items'}</p>
      </div>

      {isEmpty ? (
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some items to get started</p>
          <button className="continue-shopping" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            {cartItemsArray.map((item) => (
              <div key={item._id} className="cart-item-card">
                <div className="item-image-wrapper">
                  <img src={url+"/images/"+item.image} alt={item.name} className="item-image" />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <span className="quantity-value">{cartItems[item._id]}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => addToCart(item._id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <div className="item-total">
                  <p className="total-label">Total</p>
                  <p className="total-price">₹{(item.price * cartItems[item._id]).toFixed(2)}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item._id)}
                  aria-label="Remove item"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getTotalCartAmount().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{getTotalCartAmount() === 0 ? '0.00' : '2.00'}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{getTotalCartAmount() === 0 ? '0.00' : (getTotalCartAmount() + 2).toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={() => navigate("/order")}>
                Proceed to Checkout
              </button>
            </div>

            <div className="promo-card">
              <h3 className="promo-title">Have a promo code?</h3>
              <div className="promo-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Enter code" 
                  className="promo-input"
                />
                <button className="promo-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// import React, { useContext } from "react";
// import "./Cart.css";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cartItems, fresh_list, removeFromCart, addToCart, getTotalCartAmount } = useContext(StoreContext);

//   const navigate = useNavigate();

//   const cartItemsArray = fresh_list.filter(item => cartItems[item._id]);
//   const isEmpty = cartItemsArray.length === 0;

//   return (
//     <div className="cart-container">
//       <div className="cart-header">
//         <h1>Shopping Cart</h1>
//         <p className="cart-count">{cartItemsArray.length} {cartItemsArray.length === 1 ? 'item' : 'items'}</p>
//       </div>

//       {isEmpty ? (
//         <div className="cart-empty">
//           <div className="empty-icon">🛒</div>
//           <h2>Your cart is empty</h2>
//           <p>Add some items to get started</p>
//           <button className="continue-shopping" onClick={() => navigate("/")}>
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="cart-content">
//           <div className="cart-items-section">
//             {cartItemsArray.map((item) => (
//               <div key={item._id} className="cart-item-card">
//                 <div className="item-image-wrapper">
//                   <img src={item.image} alt={item.name} className="item-image" />
//                 </div>
//                 <div className="item-details">
//                   <h3 className="item-name">{item.name}</h3>
//                   <p className="item-price">${item.price.toFixed(2)}</p>
//                 </div>
//                 <div className="item-quantity">
//                   <button 
//                     className="quantity-btn"
//                     onClick={() => removeFromCart(item._id)}
//                   >
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                       <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                   </button>
//                   <span className="quantity-value">{cartItems[item._id]}</span>
//                   <button 
//                     className="quantity-btn"
//                     onClick={() => addToCart(item._id)}
//                   >
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                       <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="item-total">
//                   <p className="total-label">Total</p>
//                   <p className="total-price">${(item.price * cartItems[item._id]).toFixed(2)}</p>
//                 </div>
//                 <button 
//                   className="remove-btn" 
//                   onClick={() => removeFromCart(item._id)}
//                   aria-label="Remove item"
//                 >
//                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                     <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary-section">
//             <div className="summary-card">
//               <h2 className="summary-title">Order Summary</h2>
              
//               <div className="summary-row">
//                 <span>Subtotal</span>
//                 <span>${getTotalCartAmount().toFixed(2)}</span>
//               </div>
              
//               <div className="summary-row">
//                 <span>Delivery Fee</span>
//                 <span>${getTotalCartAmount() === 0 ? '0.00' : '2.00'}</span>
//               </div>
              
//               <div className="summary-divider"></div>
              
//               <div className="summary-row summary-total">
//                 <span>Total</span>
//                 <span>${getTotalCartAmount() === 0 ? '0.00' : (getTotalCartAmount() + 2).toFixed(2)}</span>
//               </div>

//               <button className="checkout-btn" onClick={() => navigate("/order")}>
//                 Proceed to Checkout
//               </button>
//             </div>

//             <div className="promo-card">
//               <h3 className="promo-title">Have a promo code?</h3>
//               <div className="promo-input-wrapper">
//                 <input 
//                   type="text" 
//                   placeholder="Enter code" 
//                   className="promo-input"
//                 />
//                 <button className="promo-btn">Apply</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

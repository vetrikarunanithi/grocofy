import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, fresh_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [useSaved, setUseSaved] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    fresh_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      window.location.replace(response.data.session_url);
    } else {
      alert("Error placing order.");
    }
  };

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.post(`${url}/api/profile/get`, {}, { headers: { token } });

        if (res.data.success) {
          const user = res.data.user;
          setAddresses(user.addresses || []);

          if (user.addresses.length === 0) {
            setIsFirstTime(true);
          } else {
            // store personal info for autofill later
            setData((prev) => ({
              ...prev,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ")[1] || "",
              email: user.email || "",
              phone: user.phone || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (!token) navigate("/cart");
    else if (getTotalCartAmount() === 0) navigate("/cart");
    else fetchProfile();
  }, []);

  // Auto-fill full combo (name, email, phone, address)
  const handleUseSaved = (addr) => {
    setUseSaved(true);
    setData((prev) => ({
      ...prev,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zipcode: addr.zipcode,
      country: addr.country,
    }));
  };

  const handleNewAddress = () => {
    setUseSaved(false);
    setData((prev) => ({
      ...prev,
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    }));
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <span>Delivery</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">2</div>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <form onSubmit={placeOrder} className="checkout-content">
        <div className="checkout-left">
          <div className="form-section">
            <h2 className="section-title">Delivery Information</h2>

            {/* Show saved delivery combos */}
            {!isFirstTime && addresses.length > 0 && (
              <div className="address-choice">
                <p>Select your saved delivery info:</p>
                {addresses.map((addr, index) => (
                  <label key={index} className="saved-address-option">
                    <input
                      type="radio"
                      name="savedAddress"
                      onChange={() => handleUseSaved(addr)}
                      checked={
                        useSaved &&
                        data.street === addr.street &&
                        data.zipcode === addr.zipcode
                      }
                    />
                    <div className="address-summary">
                      <strong>{data.firstName + " " + data.lastName}</strong> <br />
                      📧 {data.email} <br />
                      📞 {data.phone} <br />
                      🏠 {addr.street}, {addr.city}, {addr.state} - {addr.zipcode},{" "}
                      {addr.country}
                    </div>
                  </label>
                ))}
                <button type="button" className="new-address-btn" onClick={handleNewAddress}>
                  Use New Address
                </button>
              </div>
            )}

            {/* Show full form only if new address OR first time */}
            {(!useSaved || isFirstTime) && (
              <>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    type="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    value={data.phone}
                    onChange={onChangeHandler}
                    type="tel"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    name="street"
                    value={data.street}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      name="city"
                      value={data.city}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      name="state"
                      value={data.state}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      name="zipcode"
                      value={data.zipcode}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      name="country"
                      value={data.country}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="checkout-right">
          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="amount">₹{getTotalCartAmount().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span className="amount">
                  ₹{getTotalCartAmount() === 0 ? "0.00" : "2.00"}
                </span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span className="amount">
                  ₹
                  {getTotalCartAmount() === 0
                    ? "0.00"
                    : (getTotalCartAmount() + 2).toFixed(2)}
                </span>
              </div>
            </div>

            <button type="submit" className="payment-btn">
              <span>Proceed to Payment</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;

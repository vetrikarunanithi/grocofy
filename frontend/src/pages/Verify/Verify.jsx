// import React, { useState, useEffect, useContext } from "react";
// import "./Verify.css";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { StoreContext } from "../../context/StoreContext";

// const Verify = () => {
//   const [searchParams] = useSearchParams();
//   const success = searchParams.get("success");
//   const orderId = searchParams.get("orderId");
//   const { url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const [status, setStatus] = useState("loading"); // 'loading', 'success', 'failed', 'error'

//   const verifyPayment = async () => {
//     try {
//       const response = await axios.post(`${url}/api/order/verify`, {
//         success,
//         orderId,
//       });

//       if (response.data.success) {
//         setStatus("success");
//         setTimeout(() => navigate("/myorders"), 2000);
//       } else {
//         setStatus("failed");
//         setTimeout(() => navigate("/"), 2500);
//       }
//     } catch (error) {
//       setStatus("error");
//       setTimeout(() => navigate("/"), 3000);
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, []);

//   return (
//     <div className="verify">
//       {status === "loading" && (
//         <>
//           <div className="spinner"></div>
//           <p className="verify-text">Verifying your payment...</p>
//         </>
//       )}

//       {status === "success" && (
//         <div className="verify-message success">
//           <div className="icon success-icon">✔</div>
//           <p>Payment successful! Redirecting to your orders...</p>
//         </div>
//       )}

//       {status === "failed" && (
//         <div className="verify-message failed">
//           <div className="icon failed-icon">✖</div>
//           <p>Payment failed. Please try again.</p>
//         </div>
//       )}

//       {status === "error" && (
//         <div className="verify-message error">
//           <div className="icon error-icon">⚠</div>
//           <p>Network error! Could not verify your order.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Verify;

import React, { useState, useEffect, useContext } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

// Loading Spinner Icon
const LoadingIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="spinner-icon">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

// Success Icon
const SuccessIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="success-icon">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// Failed Icon
const FailedIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="failed-icon">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

// Error Icon
const ErrorIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="error-icon">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

      if (response.data.success) {
        clearCart();
        setStatus("success");
        setTimeout(() => navigate("/myorders"), 2000);
      } else {
        setStatus("failed");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  const handleRetry = () => navigate("/cart");

  return (
    <div className="verify">
      <div className="verify-card">
        {/* Loading */}
        {status === "loading" && (
          <div className="verify-content loading">
            <LoadingIcon />
            <h2>Verifying Payment</h2>
            <p>Please wait while we confirm your payment...</p>
          </div>
        )}

        {/* Success */}
        {status === "success" && (
          <div className="verify-content success">
            <SuccessIcon />
            <h2>Payment Successful!</h2>
            <p>Your order has been confirmed. Redirecting to your orders...</p>
          </div>
        )}

        {/* Failed */}
        {status === "failed" && (
          <div className="verify-content failed">
            <FailedIcon />
            <h2>Payment Failed</h2>
            <p>We couldn’t process your payment. Please try again.</p>
            <button className="retry-btn" onClick={handleRetry}>Back to Cart</button>
          </div>
        )}

        {/* Network Error */}
        {status === "error" && (
          <div className="verify-content error">
            <ErrorIcon />
            <h2>Network Error</h2>
            <p>Could not verify your order. Please try again later.</p>
            <button className="retry-btn" onClick={handleRetry}>Retry Payment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;

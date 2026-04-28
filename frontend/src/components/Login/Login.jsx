// Login.jsx
import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

const Login = ({ setShowLogin }) => {

  const {url, setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState==="Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className="login-overlay" onClick={() => setShowLogin(false)}>
      <div className="login-box" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-btn" 
          onClick={() => setShowLogin(false)}
        >
          ×
        </button>

        <div className="login-content">
          <h2>{currState === "Login" ? "Welcome Back" : "Get Started"}</h2>

          <form onSubmit={onLogin}>
            {currState === "Sign Up" && (
              <input type="text" name="name" value={data.name} onChange={onChangeHandler} placeholder="Username" required />
            )}
            <input type="text" placeholder="Full Name" required />
            <input type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder="Email" required />
            <input type="password" name="password" value={data.password} onChange={onChangeHandler} placeholder="Password" required />

            <button type="submit" className="primary-btn">
              {currState === "Sign Up" ? "Create Account" : "Sign In"}
            </button>
          </form>

          {currState === "Sign Up" && (
            <label className="terms">
              <input type="checkbox" required />
              <span>I agree to terms & privacy policy</span>
            </label>
          )}

          <div className="switch-text">
            {currState === "Login" ? (
              <>
                New here? 
                <button onClick={() => setCurrState("Sign Up")}>Create account</button>
              </>
            ) : (
              <>
                Have an account? 
                <button onClick={() => setCurrState("Login")}>Sign in</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import "./Login.css";
// import { IoLeafOutline, IoArrowBack } from "react-icons/io5";
// import { MdOutlineDeliveryDining, MdOutlineVerified, MdOutlinePayment } from "react-icons/md";

// const Login = ({ setShowLogin }) => {
//   const [currState, setCurrState] = useState("Login");

//   return (
//     <div className="login-page">
//       <div className="login-left">
//         <div className="brand-section">
//           <div className="brand-logo">
//             <div className="logo-circle">
//               <IoLeafOutline />
//             </div>
//             <h1>FreshMart</h1>
//           </div>
//           <p className="tagline">Farm-fresh vegetables, fruits & coconuts delivered to your doorstep</p>
//         </div>
        
//         <div className="features-grid">
//           <div className="feature">
//             <div className="feature-icon">
//               <MdOutlineDeliveryDining />
//             </div>
//             <h3>Fast Delivery</h3>
//             <p>Same-day delivery for fresh produce</p>
//           </div>
//           <div className="feature">
//             <div className="feature-icon">
//               <MdOutlineVerified />
//             </div>
//             <h3>100% Fresh</h3>
//             <p>Directly from farms to you</p>
//           </div>
//           <div className="feature">
//             <div className="feature-icon">
//               <MdOutlinePayment />
//             </div>
//             <h3>Secure Payment</h3>
//             <p>Safe & easy transactions</p>
//           </div>
//         </div>
//       </div>

//       <div className="login-right">
//         <button className="back-button" onClick={() => setShowLogin(false)}>
//           <IoArrowBack /> Back to Shop
//         </button>

//         <div className="form-wrapper">
//           <div className="form-top">
//             <h2>{currState === "Login" ? "Welcome Back" : "Get Started"}</h2>
//             <p>{currState === "Login" ? "Sign in to continue shopping" : "Create your account today"}</p>
//           </div>

//           <form className="login-form">
//             {currState === "Sign Up" && (
//               <input type="text" placeholder="Username" required />
//             )}
//             <input type="text" placeholder="Full Name" required />
//             <input type="email" placeholder="Email Address" required />
//             <input type="password" placeholder="Password" required />

//             {currState === "Login" && (
//               <div className="form-extras">
//                 <label className="remember">
//                   <input type="checkbox" />
//                   <span>Remember me</span>
//                 </label>
//                 <a href="#" className="forgot">Forgot?</a>
//               </div>
//             )}

//             <button type="submit" className="btn-submit">
//               {currState === "Sign Up" ? "Create Account" : "Sign In"}
//             </button>

//             {currState === "Sign Up" && (
//               <label className="terms">
//                 <input type="checkbox" required />
//                 <span>I agree to Terms & Privacy Policy</span>
//               </label>
//             )}
//           </form>

//           <div className="form-bottom">
//             {currState === "Login" ? (
//               <p>Don't have an account? <button onClick={() => setCurrState("Sign Up")}>Sign Up</button></p>
//             ) : (
//               <p>Already have an account? <button onClick={() => setCurrState("Login")}>Sign In</button></p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


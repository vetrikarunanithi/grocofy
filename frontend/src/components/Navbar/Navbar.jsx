// import React, { useState } from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/assets'

// const Navbar = () => {

//     const [menu, setMenu] = useState("home");
//   return (
//     <div className='navbar'>

//         <img src={assets.logo1} alt="" className='logo' />

//         <ul className="navbar-menu">
//             <li onClick={()=>setMenu("home")}className={menu === "home" ? "active" : ""}>home</li>
//             <li onClick={()=>setMenu("shop")}className={menu === "shop" ? "active" : ""}>shop</li>
//             <li onClick={()=>setMenu("about-us")}className={menu === "about-us" ? "active" : ""}>about us</li>
//             <li onClick={()=>setMenu("contact-us")}className={menu === "contact-us" ? "active" : ""}>contact us</li>
//         </ul>

//         <div className="navbar-right">
//             <img src={assets.search_icon} alt="" />

//             <div className="navbar-search-icon">
//                 <img src={assets.basket_icon} alt="" />
//                 <div className="dot"></div>
//             </div>

//             <button className=''>Sign in</button>
//         </div>

//     </div>
//   )
// }

// export default Navbar

import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <Link to={"/"}>
            <img src={assets.logo1} alt="Logo" className="logo" />
          </Link>

          <ul className="navbar-menu">
            <li
              onClick={() => setMenu("home")}
              className={menu === "home" ? "active" : ""}
            >
              home
            </li>
            <li
              onClick={() => setMenu("shop")}
              className={menu === "shop" ? "active" : ""}
            >
              shop
            </li>
            <li
              onClick={() => setMenu("about-us")}
              className={menu === "about-us" ? "active" : ""}
            >
              about us
            </li>
            <li
              onClick={() => setMenu("contact-us")}
              className={menu === "contact-us" ? "active" : ""}
            >
              contact us
            </li>
          </ul>

          <div className="navbar-right">
            <img src={assets.search_icon} alt="Search" />

            <Link to={"/cart"}>
              <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="Cart" />
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
              </div>
            </Link>
            {!token?<button onClick={() => setShowLogin(true)}>Sign in</button>
            :<div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/profile')}><img src={assets.bag_icon} alt="" /> <p>Profile</p></li>
                <hr />
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
              </div>}

            {/* Hamburger Menu */}
            <div
              className="navbar-hamburger"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`navbar-mobile-menu ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="navbar-mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="navbar-mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
            >
              ×
            </button>
            <ul>
              <li
                onClick={() => handleMenuClick("home")}
                className={menu === "home" ? "active" : ""}
              >
                Home
              </li>
              <li
                onClick={() => handleMenuClick("shop")}
                className={menu === "shop" ? "active" : ""}
              >
                Shop
              </li>
              <li
                onClick={() => handleMenuClick("about-us")}
                className={menu === "about-us" ? "active" : ""}
              >
                About Us
              </li>
              <li
                onClick={() => handleMenuClick("contact-us")}
                className={menu === "contact-us" ? "active" : ""}
              >
                Contact Us
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

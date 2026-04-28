// Footer.jsx
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { IoLeafOutline, IoCallOutline, IoMailOutline, IoLocationOutline } from 'react-icons/io5'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">
              <IoLeafOutline className="logo-icon" />
              <span>FreshMart</span>
            </div>
            <p className="footer-desc">
              Your trusted source for farm-fresh vegetables, fruits, and coconuts. 
              We deliver quality produce straight from local farms to your doorstep.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#delivery">Delivery Info</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Get In Touch</h3>
            <ul className="contact-list">
              <li>
                <IoLocationOutline />
                <span>123 Fresh Street, Green City, GC 12345</span>
              </li>
              <li>
                <IoCallOutline />
                <span>+91 735-586-7584</span>
              </li>
              <li>
                <IoMailOutline />
                <span>contact@freshmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 FreshMart. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#terms">Terms</a>
            <span>•</span>
            <a href="#privacy">Privacy</a>
            <span>•</span>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


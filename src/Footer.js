// Footer.js

import React from 'react';
import { FaInstagram, FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css'; // עיצוב הfooter באמצעות CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaFacebook /></a>
      </div>
      <div className="contact-info">
        <div><FaPhone /> 058-3240401</div>
        <div><FaEnvelope /> c.katz300@gmail.com</div>
      </div>
    </footer>
  );
}

export default Footer;

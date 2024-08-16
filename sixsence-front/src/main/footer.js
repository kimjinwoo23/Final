import React from 'react';
import { Link } from "react-router-dom";
import "./css/Footer.css"; // 푸터 스타일 시트

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link to="/AboutUs" className="footer-link">About Us</Link>
        <Link to="/PrivacyPolicy" className="footer-link">Privacy Policy</Link>
        <Link to="/TermsOfService" className="footer-link">Terms of Service</Link>
        <Link to="/Contact" className="footer-link">Contact</Link>
      </nav>
    </footer>
  );
}

export default Footer;
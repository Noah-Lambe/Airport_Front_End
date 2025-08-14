import React from "react";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Farewell Finder</p>
        <p>420 Blaze St, St. John's, NL, Canada A1A 2B2</p>
        <p>Email: <a href="mailto:totallyawesomeairport@group.com">farewellfinder@outlook.com</a></p>
        <p>&copy; {new Date().getFullYear()} Farewell Finder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Totally Awesome Group's Airport</p>
        <p>420 Blaze St, St. John's, NL, Canada A1A 2B2</p>
        <p>Email: <a href="mailto:totallyawesomeairport@group.com">totallyawesomeairport@group.com</a></p>
        <p>&copy; {new Date().getFullYear()} Totally Awesome Group. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

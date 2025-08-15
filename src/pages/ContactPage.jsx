import React from 'react';
import '../Styles/ContactPage.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-sidebar">
        <ul>
          <li><a href="#">Contact Info</a></li>
          <li><a href="#">Customer Feedback Form</a></li>
          <li><a href="#">Phone Directory</a></li>
        </ul>
      </div>

      <div className="contact-main">
        <h1>Mailing Address, Telephone and Fax</h1>
        <p>Fairwell Finder Authority</p>
        <p>Box 69, 420 Blaze St</p>
        <p>St. John's, NL</p>
        <p>Canada &nbsp; A1A 2B2</p>
        <br />
        <p>Telephone: 709-555-5555</p>
        <p>Toll free: 866-555-5566</p>
        <p>Fax: 709-555-6666</p>
        <p>
          Email:{' '}
          <a href="#">
            farewellfinder@outlook.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;

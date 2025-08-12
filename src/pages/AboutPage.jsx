import React from 'react';
import '../Styles/AboutPage.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-sidebar">
        <ul>
          <li><a href="https://stjohnsairport.com/about/st-johns" target="_blank">About St. Johns</a></li>
          <li><a href="https://stjohnsairport.com/about/corporate-information/history" target="_blank">History</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>

      <div className="contact-main">
        <h1>About the Airport</h1>
        <p>Totally Awesome Group's Airport is the premier transportatin gateway to the galaxy</p>
        <h2>Location</h2>
        <p>Totally Awesome Group's Airport is considered the best airport in the universe as we have sent passengers to other planets (willingly of course). This airport is the largest airport in the observable unvierse based off its numnber of passengers and its location</p>
        <h2>Geographic Coordinates</h2>
        <p>Latitude: 69° - 34' North</p>
        <p>Longitude: 420° - 69' West</p>
      </div>
    </div>
  );
};

export default Contact;

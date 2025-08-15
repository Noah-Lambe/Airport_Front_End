import React from 'react';
import '../Styles/AboutPage.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-sidebar">
        <ul>
          <li><a href="https://stjohnsairport.com/about/st-johns" target="_blank">About St. Johns</a></li>
          <li><a href="https://stjohnsairport.com/about/corporate-information/history" target="_blank">History</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>

      <div className="about-main">
        <h1>About Fairwell Finder</h1>
        <p>Fairwell Finders helps passengers find the most affordable flights anytime of the year!</p>
        <h2>Location</h2>
        <p>Fairwell Finder is the considered the best because of it's ability to help people online and inperson, with our location being in the center of the city!</p>
        <h2>Geographic Coordinates</h2>
        <p>Latitude: 69° - 34' North</p>
        <p>Longitude: 420° - 21' West</p>
      </div>
    </div>
  );
};

export default About;

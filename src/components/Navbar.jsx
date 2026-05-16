import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-glass glass">
        <div className="logo">
          ALEX RIVERS <span>| PRODUCT DESIGNER</span>
        </div>
        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#projects">PROJECTS</a>
          <a href="#services">SERVICES</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

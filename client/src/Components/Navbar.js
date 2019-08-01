import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link className="Navbar__link" to="/form">
        Book
      </Link>
      <Link className="Navbar__link" to="/appointments">
        Appointments
      </Link>
    </div>
  );
};

export default Navbar;

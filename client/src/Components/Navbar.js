import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logOut }) => {
  return (
    <div className="Navbar">
      <Link className="Navbar__link" to="/form">
        Book
      </Link>
      <Link className="Navbar__link" to="/appointments">
        Appointments
      </Link>
      <Link className="Navbar__link" to="/" onClick={logOut}>
        Log out
      </Link>
    </div>
  );
};

export default Navbar;

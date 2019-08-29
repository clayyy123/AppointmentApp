import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logOut, user }) => {
  return (
    <div className="Navbar">
      <Link className="Navbar__link" to="/users">
        Book
      </Link>
      {user && (
        <Link className="Navbar__link" to="/" onClick={logOut}>
          Log out
        </Link>
      )}
      {user && (
        <Link className="Navbar__link" to={`/profile/${user._id}`}>
          Profile
        </Link>
      )}
    </div>
  );
};

export default Navbar;

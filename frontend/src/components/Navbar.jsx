import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <Link to="/" className="text-white font-bold text-lg">
        Bookstore
      </Link>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/home">home</Link>
      <Link to="/google">GoogleSign</Link>
      <Link to="/email">Email</Link>
    </nav>
  );
};

export default Header;

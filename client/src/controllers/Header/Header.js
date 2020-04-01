import React from "react";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import "./Header.scss";
const Header = props => {
  return (
    <header className="Header">
      <img
        src="http://picsum.photos/500/200"
        className="brand-img"
        alt="brand image"
      />
      <Navigation />
      <Search />
    </header>
  );
};
export default Header;

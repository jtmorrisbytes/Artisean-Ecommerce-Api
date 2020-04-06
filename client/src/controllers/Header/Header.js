import React from "react";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import "./Header.scss";
class Header extends React.Component {
  state = {
    searchText: "",
  };
  render() {
    return (
      <header className="Header">
        <div className="row">
          <img
            src="http://picsum.photos/500/200"
            className="brand-img"
            alt="brand image"
          />
          <nav className="Navigation">
            <div className="nav-links">
              <Link to="/home">HOME</Link>
              <Link to="/products">PRODUCTS</Link>
            </div>
            <div className="cart-avatar">
              <Link to="/cart">CART</Link>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="Search">
            <input
              type="text"
              value={this.state.searchText}
              placeholder="search for a product by name"
              onChange={(e) => {
                this.setState({ searchText: e.target.value });
              }}
            />
            <Link role="button" to={"/products?name=" + this.state.searchText}>
              Search
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;

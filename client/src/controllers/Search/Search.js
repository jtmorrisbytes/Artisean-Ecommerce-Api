import React from "react";
import "./Search.css";
import { Link } from "react-router-dom";
class Search extends React.Component {
  state = {
    searchText: ""
  };
  render() {
    return (
      <div className="Search">
        <input
          type="text"
          value={this.state.searchText}
          placeholder="search for a product by name"
          onChange={e => {
            this.setState({ searchText: e.target.value });
          }}
        />
        <Link role="button" to={"/products?name=" + this.state.searchText}>
          Search
        </Link>
      </div>
    );
  }
}
export default Search;

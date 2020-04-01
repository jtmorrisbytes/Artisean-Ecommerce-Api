import React from "react";
import "./SearchFilter.scss";
function SearchFilter(props) {
  return (
    <div className="SearchFilter">
      <h3>Filter By</h3>
      <label>Name</label>
      <input value={props.name} onChange={props.handleNameChange} name="name" />
      <div className="price">
        <h4>Price</h4>
        <input
          value={props.min}
          onChange={props.handlePriceFilterChange}
          type="number"
          name="p_ge"
          placeholder="min"
        />
        <input
          value={props.max}
          onChange={props.handlePriceFilterChange}
          name="p_le"
          placeholder="max"
        />
      </div>
      <h3>Sort By</h3>
      <h4>Name</h4>
      <select onChange={props.handleSortChange} id="sort-name">
        <option value="n_asc">ascending</option>
        <option value="n_desc">descending</option>
      </select>
      <h4>price</h4>
      <select onChange={props.handleSortChange} id="sort-price">
        <option value="p_asc">low to high</option>
        <option value="p_desc">high to low</option>
      </select>
    </div>
  );
}
export default SearchFilter;

import React from "react";
// import css from "./Card.scss";
import { Link } from "react-router-dom";
const Card = props => {
  return (
    <div className="Card">
      <img src="http://picsum.photos/200/200" alt="example image" />

      <span className="name">{props.name}</span>
      <span className="price">{props.price}</span>
      <p className="description">
        {props.description}
        <a className="moreDescription">see more</a>
      </p>
      <button className="add" onClick={props.addToCart}>
        Add To Cart
      </button>
      <button
        id={props.id}
        className="delete"
        disabled={!props.enableActions}
        onClick={() => {
          props.deleteItem(props.id);
        }}>
        Delete Item
      </button>
      <Link className="edit" type="button" to={"/edit/" + props.id}>
        Edit item
      </Link>
    </div>
  );
};
export default Card;

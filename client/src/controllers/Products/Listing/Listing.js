import React from "react";
import "./Listing.scss";

export default function Listing(props) {
  return <div className="Listing">{props.products}</div>;
}

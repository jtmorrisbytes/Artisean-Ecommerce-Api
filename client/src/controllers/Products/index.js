import React, { Component } from "react";
import Card from "./Card/Card";
import "./Products.scss";
import Axios from "axios";
// import Listing from "./Listing/Listing";
import { Row, Col, Container } from "react-bootstrap";
import SearchFilter from "./SearchFilter/SearchFilter";
const defaultProduct = {
  name: "PRODUCT NAME",
  description:
    "this is a default description. something went wrong. please refresh the page and try again",
  tags: "default",
  price: 999.99,
};
class Products extends Component {
  P_ASC = "p_asc";
  P_DESC = "p_desc";
  N_ASC = "n_asc";
  N_DESC = "n_desc";
  state = {
    products: [],
    limit: 0,
    p_ge: 0,
    p_le: 999.99,
    name: "",

    sp: this.P_ASC,
    sn: this.N_ASC,
    enableActions: true,
    numItemsPerRow: 3,
  };
  constructor(props) {
    super(props);

    this.updateHistory = this.updateHistory.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  updateHistory = ({ name, sp, sn, p_ge, p_le, limit, ...rest }) => {
    this.props.history.replace(
      `${this.props.history.location.pathname}?name=${
        this.state.name || ""
      }&limit=${this.state.limit || 0}&sp=${this.state.sp || this.P_ASC}&p_le=${
        p_le || this.state.p_le || 999.99
      }&p_ge=${p_ge || this.state.p_ge || 0}`
    );
  };
  addToCart = (id) => {
    this.setState({ enableActions: false });
    Axios.post("/api/product", defaultProduct)
      .then((res) => {
        if (res.status == 200 && res.data.data) {
          this.props.history.push(
            "/edit/" + res.data.data.id + "?ref=/products"
          );
        } else {
          this.setState({ enableActions: true });
        }
      })
      .catch((err) => {
        this.setState({ enableActions: true });
        console.error(err);
      });
  };
  getSearchParams() {
    let params = new URLSearchParams(this.props.history.location.search);
    return {
      name: params.get("name") || "",
      limit: params.get("limit") || 0,
      sp: params.get("sp"),
      sn: params.get("sn"),
      p_le: params.get("p_le"),
      p_ge: params.get("p_ge"),
    };
  }
  formatProducts(products) {
    let displayProducts = [];
    let row = [];
    for (let i = 0; i < products.length; i++) {
      // displayProducts.push(this.state.products[i])
      row.push(
        <Col key={i}>
          <Card
            key={i}
            name={defaultProduct.name}
            description={defaultProduct.description}
            price={defaultProduct.price}
            {...this.state.products[i]}
            addToCart={this.addToCart}
            enableActions={this.state.enableActions}
            deleteItem={this.deleteItem}
          />
        </Col>
      );
      if (i % this.state.numItemsPerRow === 0) {
        console.log("found beginning of row: i===", i);
        displayProducts.push(<Row>{row}</Row>);
        row = [];
      }
    }
    return displayProducts;
  }
  getProducts() {
    let params = this.getSearchParams();
    Axios.get(
      `/api/products?name=${params.name}&p_le=${params.p_le}&p_ge${params.p_ge}`
    )
      .then((res) => {
        if (res.data.data) {
          this.setState({ products: this.formatProducts(res.data.data) });
        }
      })
      .catch(console.error);
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });

    this.updateHistory({ name: e.target.value });
    console.log(e.charCode, e.key, String.fromCharCode(e.keyCode));
    // this.setState({ name: e.target.value });
  }
  handlePriceChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.updateHistory({ [e.target.name]: e.target.value });
  }
  deleteItem = (id) => {
    this.setState({ enableActions: false });
    Axios.delete("/api/product/" + id)
      .then((res) => {
        this.setState({ products: res.data.data, enableActions: true });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ enableActions: true });
      });
  };
  componentDidMount() {
    this.unregisterHistoryListener = this.props.history.listen(
      this.getProducts
    );
    let params = this.getSearchParams();
    this.setState({
      name: params.name || this.state.name,
      p_ge: params.p_ge || this.state.p_ge,
      p_ge: params.p_ge || this.state.p_ge,
      limit: params.limit || this.state.limit,
    });
    this.getProducts();
  }
  componentWillUnmount() {
    if (this.unregisterHistoryListener) {
      this.unregisterHistoryListener();
    }
  }
  render() {
    // console.log("render products", this.state.products);

    return (
      <main className="Products">
        <SearchFilter
          name={this.state.name}
          handleNameChange={this.handleNameChange}
          p_ge={this.state.p_ge}
          p_le={this.state.p_le}
          handlePriceChange={this.handlePriceChange}
        />
        <Container>{this.state.products}</Container>
      </main>
    );
  }
}
export default Products;

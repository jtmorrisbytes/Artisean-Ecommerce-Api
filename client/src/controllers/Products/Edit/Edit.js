import React, { Component } from "react";
import Axios from "axios";
import "./Edit.css";
class Edit extends Component {
  constructor(props) {
    super(props);
    this.nameChangeRegex = /^[a-zA-Z- ]{0,25}$/;
    this.state = {
      price: 0,
      description: "",
      name: "",
      tags: "",
      status: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }
  handleNameChange(event) {
    if (this.nameChangeRegex.test(event.target.value)) {
      this.setState({ name: event.target.value });
    }
  }
  getProduct() {
    let id = ((this.props.match || {}).params || {}).id;
    if (id && String(+id) !== "NaN") {
      Axios.get("/api/product/" + id)
        .then(res => {
          this.setState({
            name: res.data.data.name,
            price: res.data.data.price,
            description: res.data.data.description
            // tags:
          });
        })
        .catch(err => {
          let description =
            (((err.response || {}).data || {}).error || {}).description || null;
          if (description) {
            this.setState({ status: err.response.data.error.description });
          } else {
            switch (err.response.status) {
              case 500:
                this.setState({
                  status: "Something went wrong please try again later"
                });
                break;
              case 404:
                this.setState({
                  status: "The product you were looking for was not found"
                });
            }
          }
          console.dir(err.response.data.error);
        });
    }
  }
  submitChanges() {
    Axios.put("/api/product/" + this.props.match.params.id, {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      tags: ""
    })
      .then(res => {
        switch (res.status) {
          case 200:
            this.setState({ status: "Update Successful!" });
            let ref = new URLSearchParams(
              this.props.history.location.search
            ).get("ref");
            if (ref) {
              setTimeout(() => {
                this.props.history.push(ref + "?name=" + this.state.name);
              }, 1000);
            }
            break;
        }
      })
      .catch(res => {
        switch (res.status) {
          case 500:
          case 404:
            this.setState({ status: "something went wrong... refreshing" });
            this.getProduct();
            break;
        }
      });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.id) {
      this.setState({ id: newProps.match.params.id });
    }
  }
  componentDidMount() {
    this.getProduct();
  }
  render() {
    return (
      <main className="Edit">
        {this.state.status ? <span>{this.state.status}</span> : null}
        <div className="name-container">
          <h3>Product Name</h3>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Limit 50 Characters"
            onChange={this.handleNameChange}
          />
          <br />
          {/* <span className="data-info">Limit 50 Characters</span> */}
        </div>
        <div className="price-container">
          <h3>Product price</h3>
          <input
            type="number"
            name="name"
            min={0}
            value={this.state.price}
            placeholder="0 to 999.99"
          />
        </div>
        <div className="description-container">
          <h3>Product description</h3>
          <textarea
            name="description"
            value={this.state.description}></textarea>
        </div>
        <button onMouseUp={this.submitChanges}>done</button>
      </main>
    );
  }
}
export default Edit;

import React from "react";
import logo from "./logo.svg";
import "./App.scss";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Products from "./controllers/Products";
import Edit from "./controllers/Products/Edit/Edit";
import Header from "./controllers/Header/Header";
import NotFound from "./controllers/NotFound/NotFound";
import Home from "./controllers/Home/Home";
const apiUrl = "http://builder.jtmorrisbytes.com:3001/api";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/cart">
            <p>welcome to cart</p>
          </Route>
          <Route path="/products" component={Products} apiUrl={apiUrl} />
          <Route path="/product/:id" component={Products} apiUrl={apiUrl} />
          <Route path="/edit/:id" component={Edit}></Route>

          <Route path="/">
            <Redirect to="/home" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

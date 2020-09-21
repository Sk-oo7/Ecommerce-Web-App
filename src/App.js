import React from "react";
import Header from "./Header.js";
import "./App.css";
import HomeCarousel from "./HomeCarousel.js";
import Products from "./Products.js";
import ProductCarousel from "./ProductCarousel.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./Cart.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomeCarousel />
            <Products />
            <ProductCarousel />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

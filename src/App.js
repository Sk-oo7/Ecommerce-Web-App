import React, { useEffect } from "react";
import Header from "./Header.js";
import "./App.css";
import HomeCarousel from "./HomeCarousel.js";
import Products from "./Products.js";
import ProductCarousel from "./ProductCarousel.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./Cart.js";
import SignIn from "./SignIn.js";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{}, dispach] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispach({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispach({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

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
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/SignIn" exact>
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

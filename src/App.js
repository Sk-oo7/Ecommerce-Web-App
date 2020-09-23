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
import Payment from "./Payment.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HUf2KGbh00gXxRniEIzBZhn9i78igjGOfroFN8x6TldZa89RahUNeKiYue7EJh8v0oVown4wVNFDWCHHjJdALVo00ZhMVRl9l"
);

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
        <Switch>
          <Route path="/cart" exact>
            <Header />
            <Cart />
          </Route>
          <Route path="/SignIn" exact>
            <SignIn />
          </Route>
          <Route path="/payment" exact>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <HomeCarousel />
            <Products />
            <ProductCarousel />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

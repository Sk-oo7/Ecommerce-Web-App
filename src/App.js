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
import MyOrders from "./MyOrders";
import Wishlist from "./Wishlist";
import Footer from "./Footer";
import Profile from "./Profile";
import Seller from "./Seller/Seller.js";

const promise = loadStripe(
  "pk_test_51HUf2KGbh00gXxRniEIzBZhn9i78igjGOfroFN8x6TldZa89RahUNeKiYue7EJh8v0oVown4wVNFDWCHHjJdALVo00ZhMVRl9l"
);

function App() {
  const [{ search }, dispach] = useStateValue();
  const [guest, setGuest] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispach({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        fetch(
          "https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91"
        )
          .then((response) => response.json())
          .then((data) =>
            setGuest({
              type: "SET_GUEST",
              guest: data.IPv4,
            })
          );
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
          <Route path="/seller">
            <Seller />
          </Route>
          <Route path="/Profile" exact>
            <Header />
            <Profile />
            <Footer />
          </Route>
          <Route path="/cart" exact>
            <Header />
            <Cart />
            <Footer />
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
          <Route path="/Orders" exact>
            <Header />
            <MyOrders />
            <Footer />
          </Route>
          <Route path="/Wishlist" exact>
            <Header />
            <Wishlist />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <HomeCarousel />
            <Products />
            <ProductCarousel />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Catalogue from "./Catalogue";
import Footer from "./Footer";
import Profile from "./Profile";
import Header from "./sHeader";
import SignIn from "./SignIn.js";

function Seller() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/seller" exact>
            <Header />
            <Footer />
          </Route>
          <Route path="/seller/SignIn" exact>
            <SignIn />
          </Route>
          <Route path="/seller/Catalogue" exact>
            <Header />
            <Catalogue />
            <Footer />
          </Route>
          <Route path="/seller/Profile" exact>
            <Header />
            <Profile />
            <Footer />
          </Route>
          <Route path="/seller/Orders" exact>
            <Header />
            <Footer />
          </Route>
          <Route path="/seller/Inventory" exact>
            <Header />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Seller;

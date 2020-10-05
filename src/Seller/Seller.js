import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";
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
            <Footer />
          </Route>
          <Route path="/seller/Profile" exact>
            <Header />
            <Footer />
          </Route>
          <Route path="/seller/Orders" exact>
            <Header />
            <Footer />
          </Route>
          <Route path="/seller/Messages" exact>
            <Header />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Seller;

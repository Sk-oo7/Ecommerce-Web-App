import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./sHeader";
import SignIn from "./SignIn.js";

function Seller() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/seller" exact>
            <Header />
          </Route>
          <Route path="/seller/SignIn" exact>
            <SignIn />
          </Route>
          <Route path="/seller/Catalogue" exact>
            <Header />
          </Route>
          <Route path="/seller/Profile" exact>
            <Header />
          </Route>
          <Route path="/seller/Orders" exact>
            <Header />
          </Route>
          <Route path="/seller/Messages" exact>
            <Header />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Seller;

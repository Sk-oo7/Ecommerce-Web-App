import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./sHeader";

function Seller() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/seller" exact>
            <Header />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Seller;

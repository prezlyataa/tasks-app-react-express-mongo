import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { RouteSchema } from "./routes";

class AppComponent extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <RouteSchema />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppComponent;

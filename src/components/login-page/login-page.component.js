import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class LoginPage extends Component {
  render() {
    return (
      <div>
        <h4>Login page</h4>
        <NavLink to="/tasks">Go to tasks page</NavLink>
      </div>
    );
  }
}

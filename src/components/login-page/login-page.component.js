import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './login-page.component.scss';

export class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: null
    }
  }

  onLoginChange = (e) => {
    let login = e.target.value;
    this.setState({ login: login });
  };

  onPasswordChange = (e) => {
    let password = e.target.value;
    this.setState({ password: password })
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputLogin1">Email password</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLogin1"
              aria-describedby="loginHelp"
              placeholder="Enter login"
              onChange={e => this.onLoginChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={e => this.onPasswordChange(e)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

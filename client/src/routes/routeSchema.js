import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from "../components/login-page/index";
import { TasksPage } from "../components/tasks-page/index";

export class RouteSchema extends Component {
  render() {
    return [
      <Route key='/' exact path='/' component={ TasksPage }/>,
      <Route key='/login' path='/login' component={ LoginPage }/>
    ];
  }
}

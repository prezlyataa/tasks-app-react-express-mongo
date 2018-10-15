import React, { Component } from "react";
import "./App.scss";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: null,
      loading: true
    };
  }
  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then(response => {
        this.setState({
          tasks: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderList = () => {
    if (!this.state.loading) {
      return (
        <div className="list">
          {this.state.tasks.map((task, index) => {
            return <p key={index}>{task.title}</p>;
          })}
        </div>
      );
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <form>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="task" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {this.renderList()}
      </div>
    );
  }
}

export default App;

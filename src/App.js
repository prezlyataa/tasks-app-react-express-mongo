import React, { Component } from "react";
import "./App.scss";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: null,
      loading: true,
      taskTitle: ""
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

  onTodoChange(value) {
    this.setState({
      taskTitle: value
    });
  }

  renderList = () => {
    if (!this.state.loading) {
      return (
        <div className="list">
          {this.state.tasks.map((task, index) => {
            return (
              <div className="list-task">
                <p
                  className="list-group-item list-group-item-action"
                  key={index}
                >
                  {task.title}
                </p>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </div>
            );
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
          <div className="app-form">
            <input
              type="text"
              className="form-control"
              placeholder="task"
              onChange={e => this.onTodoChange(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        {this.renderList()}
      </div>
    );
  }
}

export default App;

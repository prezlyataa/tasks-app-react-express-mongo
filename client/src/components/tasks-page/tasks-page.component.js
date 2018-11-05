import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-responsive-modal";
import "./tasks-page.component.scss";

const dateFormat = require("dateformat");

export class TasksPage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: null,
      loading: true,
      taskTitle: "",
      currentTask: null,
      open: false
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then(response => {
        this.setState({
          tasks: response.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addTask = () => {
    const { taskTitle } = this.state;
    if (taskTitle.length) {
      axios
        .post("http://localhost:5000/tasks", {
          title: taskTitle,
          date: new Date(),
          status: false
        })
        .then(res => {
          console.log(res);
          this.getTasks();
          this.setState({
            taskTitle: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  deleteTask = e => {
    let id = e.target.parentNode.parentNode.getAttribute("data-id");

    axios
      .delete(`http://localhost:5000/tasks:${id}`)
      .then(res => {
        console.log(res);
        this.getTasks();
      })
      .catch(err => {
        console.log(err);
      });
  };

  detailTask = e => {
    let id = e.target.parentNode.parentNode.getAttribute("data-id");
    let currentTask = this.state.tasks.filter(task => {
      return task._id === id;
    })[0];
    this.onOpenModal();

    this.setState({
      currentTask: currentTask
    });
  };

  onTodoChange(value) {
    this.setState({
      taskTitle: value
    });
  }

  handleChangeCheckbox = e => {
    let id = e.target.parentNode.getAttribute("data-id");
    axios
      .put(`http://localhost:5000/tasks:${id}`, { status: e.target.checked })
      .then(() => {
        this.getTasks();
      });
  };

  renderList = () => {
    const { loading } = this.state;
    if (!loading) {
      return (
        <div className="list">
          {this.state.tasks.map((task, index) => {
            return (
              <div className="list-task" key={index} data-id={task._id}>
                <input
                  type="checkbox"
                  id={task._id}
                  className="list-task__checkbox"
                  checked={task.status}
                  onChange={e => this.handleChangeCheckbox(e)}
                />
                <p
                  className="list-group-item list-group-item-action"
                  key={index}
                >
                  {task.title}
                </p>
                <div className="control-btns">
                  <button
                    type="button"
                    className="btn btn-warning edit-btn"
                    onClick={e => this.detailTask(e)}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={e => this.deleteTask(e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  renderModal = () => {
    const { open } = this.state;
    if (this.state.currentTask) {
      const date = dateFormat(
        this.state.currentTask.date,
        "dddd, mmmm dS, yyyy, h:MM:ss TT"
      );
      return (
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="dialog-content">
            <div className="dialog-content__id">
              <p>
                <b>Id:</b> {this.state.currentTask._id}
              </p>
            </div>
            <div className="dialog-content__title">
              <p>
                <b>Title:</b> {this.state.currentTask.title}
              </p>
            </div>{" "}
            <div>
              <p>
                <b>Date:</b> {date}
              </p>
            </div>
            <div>
              <p>
                <b>Status:</b>{" "}
                {this.state.currentTask.status ? "Done" : "Not done"}
              </p>
            </div>
          </div>
        </Modal>
      );
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="login-btn">
          <Link to='/login'>Login</Link>
        </div>
        <div className="app-form">
          <input
            type="text"
            className="form-control"
            placeholder="task"
            onChange={e => this.onTodoChange(e.target.value)}
            value={this.state.taskTitle}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.addTask}
          >
            Add new
          </button>
        </div>
        {this.renderList()}
        {this.renderModal()}
      </div>
    );
  }
}

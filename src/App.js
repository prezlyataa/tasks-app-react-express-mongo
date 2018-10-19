import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import Modal from "react-responsive-modal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: null,
      loading: true,
      isEdit: false,
      taskTitle: "",
      currentTask: null,
      open: false,
      newTaskTitle: ""
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

    if(taskTitle.length) {
        axios.post("http://localhost:5000/tasks", {title: taskTitle})
            .then(res => {
                console.log(res);
                this.getTasks();
                this.setState({
                    taskTitle: ''
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
  };

  deleteTask = (e) => {
    let id = e.target.parentNode.parentNode.getAttribute('data-id');

    axios.delete(`http://localhost:5000/tasks:${id}`)
        .then(res => {
            console.log(res);
            this.getTasks();
        })
        .catch(err => {
            console.log(err);
        });
  };

  updateTask = (newTitle, id) => {
      axios.put(`http://localhost:5000/tasks:${"5bc5fb06642e7339649b47e2"}`, {title: newTitle})
          .then(() => {
              this.getTasks();
              this.onCloseModal();
          });
  };

    detailTask = (e) => {
        let id = e.target.parentNode.parentNode.getAttribute('data-id');
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

  onTitleChange(value) {
      this.setState({
          newTaskTitle: value
      });
  }

  renderList = () => {
    const { loading } = this.state;
    if (!loading) {
      return (
        <div className="list">
          {this.state.tasks.map((task, index) => {
            return (
              <div className="list-task" key={index} data-id={task._id}>
                <p
                    className="list-group-item list-group-item-action"
                    key={index}
                >
                    {task.title}
                </p>
                <div className='control-btns'>
                    <button type="button" className="btn btn-warning edit-btn" onClick={e => this.detailTask(e)}>Details</button>
                    <button type="button" className="btn btn-danger delete-btn" onClick={e => this.deleteTask(e)}>
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
      if(this.state.currentTask) {
          return (
              <Modal open={open} onClose={this.onCloseModal} center>
                  <div className='dialog-content'>
                      <div className='dialog-content__id'>
                          <p><b>Id:</b> {this.state.currentTask._id}</p>
                      </div>
                      {this.renderTitle()}
                  </div>
              </Modal>
          )
      }
  };

  isEdit = () => {
      this.setState({
          isEdit: true
      })
  };

  renderTitle = () => {
      if(!this.state.isEdit) {
          return (
              <div className='dialog-content__title'>
                  <p><b>Title:</b> {this.state.currentTask.title}</p>
                  <button className="btn btn-warning" onClick={this.isEdit}>Edit</button>
              </div>
          );
      } else {
          return (
              <div className='dialog-content__title'>
                  <p><b>Title:</b> <input type="text" onChange={e => this.onTitleChange(e.target.value)}/></p>
                  <button className="btn btn-primary" onClick={this.updateTask(this.state.newTaskTitle, this.state.currentTask._id)}>Save</button>
              </div>
          )
      }
  };

  render() {
    console.log(this.state);
      return (
      <div className="App">
        <div className="app-form">
          <input
            type="text"
            className="form-control"
            placeholder="task"
            onChange={e => this.onTodoChange(e.target.value)}
            value={this.state.taskTitle}
          />
          <button type="submit" className="btn btn-primary" onClick={this.addTask}>
            Add new
          </button>
        </div>
          {this.renderList()}
          {this.renderModal()}
      </div>
    );
  }
}

export default App;

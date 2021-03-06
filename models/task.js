const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: Boolean, required: false }
  },
  { collection: "tasks" }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Task = require("./models/task");
const User = require("./models/user");
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
const app = express();

app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({ extended: true }));

const SERVER = '127.0.0.1:27017';
const DB = "tasks-app";
const MONGO_ATLAS = `mongodb://prezlyata:byra1212*@cluster0-shard-00-00-dbi6l.mongodb.net:27017,cluster0-shard-00-01-dbi6l.mongodb.net:27017,cluster0-shard-00-02-dbi6l.mongodb.net:27017/${DB}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
const mLab = 'mongodb://yprezlyata:byra1212@ds157204.mlab.com:57204/tasks-app';
const Mongo_Shall = `mongodb://${SERVER}/${DB}`;
const port = process.env.PORT || 5000;

const MONGODB_URI = `${MONGO_ATLAS}`;

const connection = mongoose.connection;
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};

MongoClient.connect(
  MONGODB_URI,
  (err, client) => {
    if (err) {
      console.log("Error occurred while connecting to MongoDB...", err);
    }
    console.log("Connected to Mongodb");
    const collection_tasks = client.db("tasks-app").collection("tasks");
    //const collection_users = client.db("tasks-app").collection("users");
    // perform actions on the collection object
    client.close();
  }
  );

mongoose.Promise = Promise;
mongoose.connect(
  MONGODB_URI,
  option
);

connection.on("connected", () => console.log("Connected to database"));
connection.on("error", err => console.log("Connection failed with - ", err));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'client/build')));
//
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build/index.js'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get("/tasks", (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
});

app.post("/tasks", (req, res, next) => {
  Task.create(req.body, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

app.put("/tasks:id", (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id.substr(1), req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

app.delete("/tasks:id", (req, res, next) => {
  Task.findByIdAndRemove(req.params.id.substr(1), req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

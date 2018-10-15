const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const data = require("./data.json");

app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route

app.get("/tasks", (req, res) => {
  res.send(data);
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
let tasks =[{ title: 'task1' },{ title: 'task2' },{ title: 'task3' },{ title: 'task4'}];
app.get('/tasks', (req, res) => {
  res.send(tasks);
});


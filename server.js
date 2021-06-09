const express = require("express");

const app = express();

const port = 4001;

app.get("/", (req, res) => {
  res.send(`Hello Express! Im listening on port ${port}!`);
});

app.get("/about", (req, res) => {
  res.send(`This is Abaut`);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

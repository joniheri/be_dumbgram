// import express
const express = require("express");

// import our router
const router1 = require("./src/routers/router1");

const app = express();

const port = 4001;

app.use(express.json());

// tes running program
app.get("/", (req, res) => {
  res.send(`Hello, I'm Express JS! listening on port ${port}!`);
});
app.get("/about", (req, res) => {
  res.send(`This is Abaut`);
});
// end tes running program

app.use("/api/v1/", router1);

app.listen(port, () => console.log(`Listening on port ${port}!`));

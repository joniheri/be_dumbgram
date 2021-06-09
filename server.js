const express = require("express");

const app = express();

const port = 4001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello Express! Im listening on port ${port}!`);
});

app.get("/about", (req, res) => {
  res.send(`This is Abaut`);
});

// TestData
let testDatas = [
  {
    id: "1",
    name: "Jon Heri",
    email: "jonheri@email.com",
  },
  {
    id: "2",
    Name: "Tata Oktya",
    email: "tata@email.com",
  },
  {
    id: "3",
    Name: "Example3",
    email: "Example3@email.com",
  },
];

app.get("/testdatas", (req, res) => {
  res.send(testDatas);
});

app.get("/testdata/:id", (req, res) => {
  const id = req.params.id;
  const findData = testDatas.find((findData) => findData.id == id);

  if (findData) {
    res.send({
      status: "Success",
      message: "Data is already!",
      findData,
    });
  } else {
    res.send({
      status: "Failed",
      message: `Data with id ${id} not found`,
    });
  }
});

app.post("/testdata", (req, res) => {
  const datas = req.body;

  testDatas = [...testDatas, datas];

  res.send({
    status: "Succes",
    message: "Input new data fail!",
    dataInput: datas,
    newData: testDatas,
  });
});

app.patch("/testdata/:id", (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const findData = testDatas.find((findData) => findData.id == id);

  if (!findData) {
    return res.send({
      status: "Failed",
      message: `Data with id ${id} not found`,
    });
  }

  const updateData = testDatas.map((findData) => {
    return findData.id == id ? body : findData;
  });

  testDatas = updateData;

  res.send({
    status: "Succes",
    message: "Update tesetData Successfully",
    data: body,
  });
});

app.delete("/testdata/:id", (req, res) => {
  const id = req.params.id;
  const findData = testDatas.find((findData) => findData.id == id);

  if (!findData) {
    return res.send({
      status: "Failed",
      message: `Data with id ${id} not found`,
    });
  }

  const newData = testDatas.filter((findData) => findData.id != id);

  testDatas = newData;

  res.send({
    status: "Success",
    message: `Delete testData with id ${id} Successfully`,
    newdata: newData,
  });
});
// TestData

app.listen(port, () => console.log(`Listening on port ${port}!`));

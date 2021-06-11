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

exports.getTestDatas = (req, res) => {
  res.send({
    status: "Respon Success",
    viewData: testDatas,
  });
};

exports.getTestData = (req, res) => {
  const id = req.params.id;
  const findData = testDatas.find((findData) => findData.id == id);

  if (findData) {
    res.send({
      status: "Respon Success",
      message: "Data is exist!",
      findData,
    });
  } else {
    res.send({
      status: "Respon Failed",
      message: `Data with id ${id} not found`,
    });
  }
};

exports.postTestData = (req, res) => {
  const datas = req.body;

  testDatas = [...testDatas, datas];

  res.send({
    status: "Respon Succes",
    message: "Input new data Successfully!",
    dataInput: datas,
    newData: testDatas,
  });
};

exports.patchTestData = (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const findData = testDatas.find((findData) => findData.id == id);

  if (!findData) {
    return res.send({
      status: "Failed",
      message: `Data with id:${id} not found`,
    });
  }

  const updateData = testDatas.map((findData) => {
    return findData.id == id ? body : findData;
  });

  testDatas = updateData;

  res.send({
    status: "Respon Succes",
    message: "Update testData Successfully",
    data: body,
  });
};

exports.deleteTestData = (req, res) => {
  const id = req.params.id;
  const findData = testDatas.find((findData) => findData.id == id);

  if (!findData) {
    return res.send({
      status: "Failed",
      message: `Data with id:${id} not found`,
    });
  }

  const newData = testDatas.filter((findData) => findData.id != id);

  testDatas = newData;

  res.send({
    status: "Respon Success",
    message: `Delete testData with id:${id} Successfully`,
    newdata: newData,
  });
};

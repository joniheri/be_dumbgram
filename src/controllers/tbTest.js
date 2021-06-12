const { tb_test } = require("../../models");

// GetDatas
exports.tests = async (req, res) => {
  try {
    const tests = await tb_test.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "Respon success",
      message: "Test data Successfully get",
      viewData: tests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Respon failed",
      message: "View Test data Failed!",
    });
  }
};
// EndGetDatas

// DetailData
exports.detailTest = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = await tb_test.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id: id,
      },
    });
    if (!findData) {
      return res.send({
        status: "Respon Failed",
        message: `Data with id:${id} not found`,
      });
    }
    res.send({
      status: "Respon success",
      message: "Test data Successfully get",
      viewData: findData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Respon failed",
      message: "View Test data Failed!",
    });
  }
};
// EndDetailData

// AddData
exports.addTest = async (req, res) => {
  try {
    const { body } = req;
    await tb_test.create(body);

    const tests = await tb_test.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Respon success",
      message: "Add data Successfully",
      viewDatasAfterAdd: tests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Respon failed",
      message: "Add data Failed!",
    });
  }
};
// EndAddData

// UpdateData
exports.updateTest = async (req, res) => {
  try {
    // find data with id
    const id = req.params.id;
    const findData = await tb_test.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id: id,
      },
    });

    // check data with id
    if (!findData) {
      return res.send({
        status: "Respon failed",
        message: `Data with id:${id} not found!`,
      });
    }

    // update data with id
    const { body } = req;
    await tb_test.update(body, {
      where: {
        id: id,
      },
    });

    // find all data after apdate
    const tests = await tb_test.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // view respon success
    res.send({
      status: "Respon success",
      message: "Update data Successfully",
      viewDataWillUpdate: findData,
      viewDatasNewUpdate: tests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Respon failed",
      message: "Update Test data Failed!",
    });
  }
};
// EndUpdateData

// deleteData
exports.deleteTest = async (req, res) => {
  try {
    // find data with id
    const id = req.params.id;
    const findData = await tb_test.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id: id,
      },
    });

    // cek data
    if (!findData) {
      return res.send({
        status: "Respon Failed",
        message: `Data with id:${id} not found`,
      });
    }

    // delete data with id
    await tb_test.destroy({
      where: {
        id: id,
      },
    });

    // find all data after delete
    const tests = await tb_test.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // respon delete success
    res.send({
      status: "Respon success",
      message: "Delete data Successfully!",
      viewDataWillDelete: findData,
      viewDatasNewUpdate: tests,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Respon failed",
      message: "Delete data Failed!",
    });
  }
};
// EndDeleteData

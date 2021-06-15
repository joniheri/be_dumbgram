const { user } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");

// GetDatas
exports.getUsers = async (req, res) => {
  try {
    const findDatas = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "Respon success",
      message: "Test data Successfully get",
      viewDatas: findDatas,
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
exports.detailUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findData = await user.findOne({
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
exports.addUser = async (req, res) => {
  try {
    const { body } = req;
    await user.create(body); //-->this is code create/input data to database

    const findDatas = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Respon success",
      message: "Add data Successfully",
      viewDatasAfterAdd: findDatas,
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
exports.updateUser = async (req, res) => {
  try {
    // find data with id
    const id = req.params.id;
    const findData = await user.findOne({
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

    // this is code update data with id to database
    const { body } = req;
    await user.update(body, {
      where: {
        id: id,
      },
    });

    // find all data after apdate
    const findDatas = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // view respon success
    res.send({
      status: "Respon success",
      message: "Update data Successfully",
      viewDataWillUpdate: findData,
      viewDataAferUpdate: findDatas,
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
exports.deleteUser = async (req, res) => {
  try {
    // find data with id
    const id = req.params.id;
    const findData = await user.findOne({
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

    // this is code delete data in database with id
    await user.destroy({
      where: {
        id: id,
      },
    });

    // find all data after delete
    const findDatas = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // respon delete success
    res.send({
      status: "Respon success",
      message: "Delete data Successfully!",
      viewDataWillDelete: findData,
      viewDataAfterUpdate: findDatas,
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

// Register
exports.register = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = req.body;

    const schema = joi.object({
      username: joi.string().min(6).required(),
      email: joi.string().email().min(8).required(),
      password: joi.string().min(6).required(),
      image: joi.string().min(4),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Validate Failed",
        message: error.details[0].message,
      });
    }

    // check "email user" is exist
    const findEmail = await user.findOne({
      where: {
        email: email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (findEmail) {
      return res.send({
        status: "Failed",
        message: `Email: ${email} already registered`,
        dataFindEmail: findEmail,
      });
    }
    // end check "email user" is exist

    // bcrypt password
    const hashStrenght = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrenght);
    // end bcrypt password

    // imput data to database
    const dataUser = await user.create({
      ...data,
      password: hashedPassword,
    });
    //  end imput data to database

    res.send({
      status: "Respon Success",
      message: "Validate input ok",
      data: {
        email: dataUser.email,
        username: dataUser.username,
        password: dataUser.password,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Respon failed",
      message: "Register Failed!" + error,
    });
  }
};
// EndRegister

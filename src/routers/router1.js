// ipmort express
const express = require("express");
const router = express.Router();

//import testData router/url
const {
  getTestDatas,
  getTestData,
  postTestData,
  patchTestData,
  deleteTestData,
} = require("../controllers/testData");

// make test router
router.get("/testdatas", getTestDatas);
router.get("/testdata/:id", getTestData);
router.post("/testdata/", postTestData);
router.patch("/testdata/:id", patchTestData);
router.delete("/testdata/:id", deleteTestData);
// end make test router

//import tb_test router/url
const {
  tests,
  detailTest,
  addTest,
  updateTest,
  deleteTest,
} = require("../controllers/tbTest");

// make tb_test router
router.get("/test", tests);
router.get("/detailtest/:id", detailTest);
router.post("/addtest", addTest);
router.patch("/updatetest/:id", updateTest);
router.delete("/deletetest/:id", deleteTest);
// end make tb_test router

//import tbUser router/url
const {
  getUsers,
  addUser,
  detailUser,
  updateUser,
  deleteUser,
  register,
} = require("../controllers/tbUser");

// make tbUser router
router.get("/users", getUsers);
router.get("/detailuser/:id", detailUser);
router.post("/adduser", addUser);
router.patch("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);
router.post("/registeruser/", register);
// end make tbUser router

module.exports = router;

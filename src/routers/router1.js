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

module.exports = router;

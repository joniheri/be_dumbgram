// ipmort express
const express = require("express");
const router = express.Router();

//import our router/url
const {
  getTestDatas,
  getTestData,
  postTestData,
  patchTestData,
  deleteTestData,
} = require("../controllers/testData");

// make our router
router.get("/testdatas", getTestDatas);
router.get("/testdata/:id", getTestData);
router.post("/testdata/", postTestData);
router.patch("/testdata/:id", patchTestData);
router.delete("/testdata/:id", deleteTestData);
// end make our router

module.exports = router;

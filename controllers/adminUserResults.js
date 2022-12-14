const g2Details= require("../models/g2Details");
const ejs = require("ejs");
const path = require("path");
const res = require("express/lib/response");
const req = require("express/lib/request");

 global.UserResults;

 const getPassUserDetails = async (req, res) => {
  const a = await g2Details.find({ testResult: true });
  console.log("-----------y");
  console.log(a);
  res.render("adminUserResults", { g2GetDetails: a });
};

module.exports={getPassUserDetails}
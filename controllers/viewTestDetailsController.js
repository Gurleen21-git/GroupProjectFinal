const g2Details= require("../models/g2Details");
const ejs = require("ejs");
const path = require("path");
const res = require("express/lib/response");
const req = require("express/lib/request");


const getViewDetailsbyID=async (req, res) => {
      const g2GetDetails = await g2Details.findById(req.params.id);
      req.session.DriverID=req.params.id;
      console.log("individual",g2GetDetails);
      res.render("viewTestDetails",{g2GetDetails});
};

const postTestResults=async (req, res) => {
    var id=req.session.DriverID;
    const result= await g2Details.findByIdAndUpdate(id,{
        firstname:g2Details.firstname,
        lastname:g2Details.lastname,
        age:g2Details.age,
        licensenumber:g2Details.licensenumber,
        DOB:g2Details.DOB,
        carmake:g2Details.carmake,
        carmodel:g2Details.carmodel,
        manufacturedyear:g2Details.manufacturedyear,
        platenumber:g2Details.platenumber,
        testType:"G",
        comments:req.body.Comments,
        testResult:req.body.testResult=="Pass"?true:false
     });
     //req.flash('testupdated', 'The results have been submitted');
     res.redirect("upcomingTests");
};

module.exports={getViewDetailsbyID,postTestResults}
const g2Details= require("../models/g2Details");
const ejs = require("ejs");
const path = require("path");
const res = require("express/lib/response");
const req = require("express/lib/request");

global.filteredData;

const getUpcomingTest=async(req,res)=>{
      const g2GetDetails = await g2Details.find({});
      req.session.AllTest= g2GetDetails;

      res.render("upcomingTests",{g2GetDetails:g2GetDetails});
}

const getFilteredData= async(req,res)=>{
      const g2GetDetails = await g2Details.find({});
      const filter=  g2GetDetails.filter(x=>{
            if(x.testType==req.params.testType){
               return x.toJSON();
            }

      })
      console.log(filter);
      filter.forEach(element => {
            firstname=element.firstname,
            lastname=element.lastname,
            DOB=element.DOB,
            licensenumber=element.licensenumber,
            age=element.age,
            testType=element.testType
      });

      console.log("filtered",filter);
      res.render("upcomingTests",{g2GetDetails:filter});
}

const postTestResults= async(req,res)=>{
      if(req.body.PassFail=="Pass"){
            g2Details.PassFail=true
      }
      else{
            g2Details.PassFail=false
      }
}

// const getViewDetailsbyID=async (req, res) => {
//       const g2GetDetails = await g2Details.findById(req.params.id);
//       console.log("individual",g2GetDetails);
//       res.render("viewTestDetails",{g2GetDetails});
//     };

module.exports={getUpcomingTest,getFilteredData}
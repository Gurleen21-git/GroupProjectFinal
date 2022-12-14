const g2Details= require("../models/g2Details");
const ejs = require("ejs");
const path = require("path");
const res = require("express/lib/response");
const req = require("express/lib/request");


const getViewResultData=async (req, res) => {
    var username=req.session.UserModel.username;
    g2Details.findOne({username:username}, (error, g2)=>{
      if(g2){
         req.session.userid= g2._id;
       
         res.render("viewTestResult",{ g2GetDetails:g2});
      }
     }
   );
};



module.exports={getViewResultData}
const g2Details= require("../models/g2Details");
const ejs = require("ejs");
const path = require("path");
const res = require("express/lib/response");
const req = require("express/lib/request");

 global.UserResults;

const getPassUserDetails=async(req,res)=>{

      await g2Details.find({testResult:true},(err, result)=> {  
        if(result){
            console.log(result);
            global.UserResults=result; 
           
        } 
        });  

    
        
      res.render("adminUserResults",{g2GetDetails:global.UserResults});
}







module.exports={getPassUserDetails}
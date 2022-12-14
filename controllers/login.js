const bcrypt = require("bcrypt");
const checkUserType = require("../middlewares/checkUserType");
const User = require("../models/User");


module.exports = (req,res)=> {
    
    const { username, password } = req.body;
    let invalidCred= false;
    User.findOne({username:username}, (error, user)=>{
        if(user){
          
             bcrypt.compare(password, user.password, (error, same)=> {
                if(same){
                  
                    req.session.UserModel=user;
                    req.session.userId = user._id;
                    global.loggedIn=true;
                    global.checkUserType=user.userType;
                    res.redirect("/dashboard");

                    
                } else {
                    invalidCred=true;
                    res.render("login",{invalidCred})
                }
            });
        } else {
            res.redirect("/login");
        }
    });
}
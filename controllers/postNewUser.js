const User = require("../models/User");


module.exports = async (req, res) => {
    let passwordNotMatch=false;
    let validationErrors = [];
    if(req.body.password===req.body.repeatpassword){
        try {
            console.log(req.body);
            await User.create(req.body);
            res.redirect("/login");
        } catch(error){
            
            console.log(error);
            const validationErrors = Object.keys(error.errors).map(
                (key) => error.errors[key].message
            );
         
            req.flash("data", req.body);
            req.flash("validationErrors", validationErrors);
            res.redirect("/signup");
        }
    }
    else{
        passwordNotMatch=true;
        res.render("signup",{passwordNotMatch,errors: req.flash("validationErrors")});
    }

  
  
};

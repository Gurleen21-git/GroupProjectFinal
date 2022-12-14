module.exports = (req,res) => {
  let passwordNotMatch=false;
  var username = "";
  var password = "";
  const data = req.flash("data")[0];

  if (typeof data != "undefined") {
    username = data.username;
    password = data.password;
  }
    res.render('signup',{
      errors: req.flash("validationErrors"),
      username: username,
      password: password,
      passwordNotMatch
    });
  };
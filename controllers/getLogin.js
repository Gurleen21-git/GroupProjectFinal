module.exports = async(req,res) => {
     global.checkUserType=null;
     let invalidCred= false;
     res.render('login',{invalidCred});
};
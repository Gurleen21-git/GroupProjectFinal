require("dotenv").config();

const express= require("express");
const path = require("path");
const ejs= require("ejs");
const mongoose= require("mongoose");
const mongoStore= require("connect-mongo");
const expressSession = require("express-session");
const flash = require('connect-flash');
const auth = require("./middlewares/auth");
const redirectIfAuth = require("./middlewares/redirectIfAuth")
const loggedInMiddleware = require("./middlewares/loggedIn");
const checkUserType = require("./middlewares/checkUserType");
const g2Details= require("./models/g2Details");
const homeController= require("./controllers/homeController");
const gController= require("./controllers/getG_Details");
const g2Controller= require("./controllers/getG2_Details");
const loginController= require("./controllers/login");
const getloginController= require("./controllers/getLogin");
const signupController= require("./controllers/postNewUser");
const getSignupController= require("./controllers/getSignUp");
const postG2Controller= require("./controllers/postG2_Details");
const postGController= require("./controllers/postG_Details");
const getAppointmentController= require("./controllers/get_Appointment");
const postAppointmentController= require("./controllers/post_appointment");
const {getUpcomingTest,getFilteredData}= require("./controllers/upcomingTestController");
const {getViewDetailsbyID,postTestResults}= require("./controllers/viewTestDetailsController");
const {getPassUserDetails}= require("./controllers/adminUserResults");
const {getViewResultData}= require("./controllers/viewTestResults");



const app= new express();
global.loggedIn = null;
global.checkUserType=null;
global.checkUserTypeAdmin=null;

app.use(expressSession({
  secret: "kaur21", 
  resave: false,
  saveUninitialized: true ,
  store: mongoStore.create({mongoUrl:process.env.MONGO_URL})}
 ));
app.use("*", loggedInMiddleware)
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(
  process.env.MONGO_URL,
    {useNewUrlParser:true}
  );

app.use(flash());

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.get("/",getloginController);

app.get("/dashboard",homeController);

app.get("/g",gController);

app.get("/g2",g2Controller);

app.get("/signup", redirectIfAuth, getSignupController);

app.get("/login", redirectIfAuth, getloginController);

app.get("/appointments", getAppointmentController);

app.get("/upcomingTest", getUpcomingTest);

app.get("/viewDetails/:id",getViewDetailsbyID );

app.get("/userResults",getPassUserDetails );

app.get("/viewTestResults",getViewResultData );


app.post("/g2/post",postG2Controller);

app.post("/g/post",postGController);

app.post("/users/signup", redirectIfAuth, signupController);

app.post("/users/login", redirectIfAuth, loginController);

app.post("/post/appointment",postAppointmentController);

app.post("/post/DriverTestResults",postTestResults);

app.get("/signout",async(req, res) => {
  req.session.destroy();
  global.checkUserType = null;
  req.session.userId = null;
  res.render("login");
});

app.listen(4000,()=>{
    console.log("listen 4000");
});
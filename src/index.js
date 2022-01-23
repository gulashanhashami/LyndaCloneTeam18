const express=require("express");
const course_controller = require("./controllers/course.controller");
const paymentController = require("./controllers/payment.controller");
const clientController = require("./controllers/client.controller");
const passport = require("./configs/passport");
const {register, login}=require("./controllers/authentication.controller")

const app=express();
app.use(express.json());
app.post("/register", register); 
app.post("/login", login);
app.use("/courses", course_controller);
app.use("/payments", paymentController);
app.use("/clients", clientController);
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());

passport.serializeUser(function (user, callback) { 
  callback(null, user); 
});
passport.deserializeUser(function (user, callback) {
  callback(null, user);
});

app.get(  
  "/auth/google", 
  passport.authenticate("google", { scope: ["email", "profile"] })
); 
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://127.0.0.1:5501/signup.html",
    successRedirect:  "http://127.0.0.1:5501/home.html" 
  }),
  (req, res) => { 
    return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);
app.get("/auth/google/failure", (req, res) => {
  return res.send("Failure");
});

module.exports=app; 
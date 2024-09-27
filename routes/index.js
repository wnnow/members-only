const router = require("express").Router();
const passport = require("../database/passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const pgPool = require("../database/pool");
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
const { validateSignUp } = require("../validators/validators");

// TODO
// get route

// check if user or member or not
// navbar and footer attach to every path
// navbar include login signup for non-user
// navbar include post-message upgrade-member for user
// navbar include post-message upgrade-member for member (upgrade member include upgrade to admin)
// if(admin) can delete message
router.get("/", messageController.getMessages);

//create form login page
router.get("/login", userController.loginGet);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

//create form signup page
router.get("/signup", userController.signUpGet);

//create form upgrade member or admin page
router.get("/member", (req, res, next) => {});

router.get("/member-successful", (req, res, next) => {});

router.get("/member-failure", (req, res, next) => {});

// TODO
// post route
// show message if username or password incorrect
//if valid redirect to '/'
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

//validate form
//if valid redirect to '/login'
router.post("/signup", validateSignUp, userController.signUpPost);

// post message
router.post("/create-message", messageController.addMessage);

// become member or admin
// show message when incorrect member or admin password
// if valid redirect to '/member-successful'
// if invalid redirect to '/member-failure'
router.post("/member", (req, res, next) => {});

//put method
router.put("/cancel-member/:id", userController.cancelMembershipPut);

router.delete("/delete-msg/:id", messageController.deleteMessage);

module.exports = router;

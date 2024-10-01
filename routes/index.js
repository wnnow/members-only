const router = require("express").Router();
const passport = require("../database/passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const pgPool = require("../database/pool");
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
const { validateSignUp } = require("../validators/validators");

router.get("/", messageController.getMessages);

router.get("/login", userController.loginGet);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

router.get("/signup", userController.signUpGet);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", { title: "Login", error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.post("/signup", validateSignUp, userController.signUpPost);

router.post("/create-message", messageController.addMessage);

router.post("/join-member", userController.joinMemberPost);

router.post("/join-admin", userController.joinAdminPost);

router.put("/cancel-member/:id", userController.cancelMembershipPut);

router.put("/cancel-admin/:id", userController.cancelAdminPut);

router.delete("/delete-msg/:id", messageController.deleteMessage);

module.exports = router;

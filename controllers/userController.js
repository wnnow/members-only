const db = require("../database/queryUsers");
const bcrypt = require("bcryptjs");
const validateFormData = require("../utils/validateFormData");
const { validationResult } = require("express-validator");

function signUpGet(req, res, next) {
  res.render("signup", { title: "Sign up", error: null });
}

function loginGet(req, res, next) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login", { title: "Log in", error: null });
}

async function signUpPost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("signup", {
      title: "Sign Up",
      error: errors.array()[0].msg,
    });
  }

  const { first_name, last_name, username, password, confirm_password } =
    req.body;

  const formattedFirstName = validateFormData.toProperCase(first_name);
  const formattedLastName = validateFormData.toProperCase(last_name);
  const formattedUsername = username.toLowerCase();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insertUser(
      formattedFirstName,
      formattedLastName,
      formattedUsername,
      hashedPassword
    );
    console.log(`insert user success`);
    res.redirect("/login");
  } catch (err) {
    console.error("Error occurred while signing up:", err);
    res.render("signup", {
      title: "Sign Up",
      error: "An error occurred. Please try again.",
    });
  }
}

async function cancelMembershipPut(req, res) {
  try {
    console.log("cancel req.user.id: === ", req.user.id);
    console.log("cancel req.params === ", req.params);

    const { id } = req.params;
    if (req.user.id === parseInt(id)) {
      console.log("user id match");
      await db.updateMembership(id, false);
    }
    console.log("cancel member successful");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error occur while canceling membership");
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}

module.exports = {
  signUpPost,
  signUpGet,
  loginGet,
  cancelMembershipPut,
};

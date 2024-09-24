const db = require("../database/queryUsers");
const bcrypt = require("bcryptjs");
const validateFormData = require("../utils/validateFormData");
const { validationResult } = require("express-validator");

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

  console.log(first_name);
  console.log(last_name);
  console.log(username);
  console.log(password);

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

// async function loginPost(req, res, next) {
//   const { username, password } = req.body;
//   try {
//     const user = await db.getUser(username)
//     if(!user) {

//     }
//   } catch (err) {
//     console.error("Error occurred while login", err);
//     res.render("login", { title: "Login", error: err });
//   }
// }

function signUpGet(req, res, next) {
  res.render("signup", { title: "Sign up", error: null });
}

function loginGet(req, res, next) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login", { title: "Log in", error: null });
}

module.exports = {
  signUpPost,
  signUpGet,
  loginGet,
};

const db = require("../database/queryUsers");
const bcrypt = require("bcryptjs");
const validateFormData = require("../utils/validateFormData");
const { validationResult } = require("express-validator");
require("dotenv").config();

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
    const { id } = req.params;
    if (req.user.id === parseInt(id)) {
      await db.updateMembership(id, false);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error occur while canceling membership");
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}

async function joinMemberPost(req, res) {
  try {
    const { member_code } = req.body;
    if (member_code === process.env.MEMBER_CODE) {
      await db.updateMembership(req.user.id, true);
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: "Incorrect secret code" });
    }
  } catch (error) {
    console.error("Error occur while joining membership:", error);
  }
}

async function joinAdminPost(req, res) {
  try {
    const { admin_pwd } = req.body;
    if (admin_pwd === process.env.ADMIN_PASSWORD) {
      await db.updateAdmin(req.user.id, true);
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error occur while joining admin:", error);
  }
}

async function cancelAdminPut(req, res) {
  try {
    const { id } = req.params;
    if (req.user.id === parseInt(id)) {
      await db.updateAdmin(id, false);
    }
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
  joinMemberPost,
  cancelMembershipPut,
  joinAdminPost,
  cancelAdminPut,
};

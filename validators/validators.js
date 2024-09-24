const { body } = require("express-validator");

// Validation rules for the sign-up form
const validateSignUp = [
  body("first_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be between 1 and 50 characters")
    .matches(/^[A-Za-zÀ-ÿ '-]+$/)
    .withMessage("Invalid First name"),

  body("last_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be between 1 and 50 characters")
    .matches(/^[A-Za-zÀ-ÿ '-]+$/)
    .withMessage("Invalid Last name"),

  body("username")
    .isEmail()
    .withMessage("Invalid email")
    .isLength({ max: 150 })
    .withMessage("Email cannot be longer than 150 characters")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters"),

  body("confirm_password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
];

module.exports = {
  validateSignUp,
};

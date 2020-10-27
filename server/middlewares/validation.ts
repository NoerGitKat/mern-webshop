import { check } from "express-validator";

const validateLogin = [
  check("email").isEmail().withMessage("Fill in a valid email address!"),
  check("password").notEmpty().withMessage("Fill in your password!"),
];

const validateRegister = [
  check("username")
    .isLength({ min: 3 })
    .withMessage("Fill in a username of at least 3 characters!"),
  check("email").isEmail().withMessage("Fill in a valid email address!"),
  check("password")
    .matches(/(?=.*[A-Z])[A-Za-z\d@$!_%*-?&+]{8,}/)
    .withMessage(
      "Your password should contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 digit and a special character"
    ),
];

export { validateLogin, validateRegister };

import { check } from "express-validator";

const validateLogin = [
  check("email").isEmail().withMessage("Fill in a valid email address!"),
  check("password").notEmpty().withMessage("Fill in your password!"),
];

export { validateLogin };

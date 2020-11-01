import { check } from "express-validator";

const validateLogin = [
  check("email").isEmail().withMessage("Fill in a valid email address!"),
  check("password").notEmpty().withMessage("Fill in your password!"),
];

const validateRegister = [
  check("username")
    .matches(/^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/)
    .withMessage(
      "Fill in a username of at least 3 characters, no spaces allowed."
    ),
  check("email").isEmail().withMessage("Fill in a valid email address!"),
  check("password")
    .matches(/(?=.*[A-Z])[A-Za-z\d@$!_%*-?&+]{8,}/)
    .withMessage(
      "Your password should contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 digit and a special character"
    ),
];

const validateUpdateProfile = [
  check("username")
    .matches(/^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/)
    .withMessage(
      "Fill in a username of at least 3 characters, no spaces allowed."
    ),
  check("email").isEmail().withMessage("Fill in a valid email address!"),
  check("password")
    .matches(/(?=.*[A-Z])[A-Za-z\d@$!_%*-?&+]{8,}/)
    .optional({ checkFalsy: true })
    .withMessage(
      "Your password should contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 digit and a special character"
    ),
];

const validateOrder = [
  check("orderItems").exists(),
  check("shippingAddress").exists(),
  check("paymentMethod").isString().withMessage(""),
  check("itemsPrice")
    .isNumeric()
    .withMessage("Items price should be a number."),
  check("taxPrice").isNumeric().withMessage("Tax price should be a number."),
  check("shippingPrice")
    .isNumeric()
    .withMessage("Shipping price should be a number."),
  check("totalPrice")
    .isNumeric()
    .withMessage("Total price should be a number."),
];

export {
  validateLogin,
  validateRegister,
  validateUpdateProfile,
  validateOrder,
};

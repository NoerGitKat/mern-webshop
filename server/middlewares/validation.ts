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
  check("paymentMethod").isString(),
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

const validateUpdateUser = [
  check("username").isString().withMessage("Fill in a valid username."),
  check("email").isEmail().withMessage("Fill in a valid email."),
  check("isAdmin")
    .isBoolean()
    .optional({ checkFalsy: true })
    .withMessage("Fill in a valid username."),
];

const validateNewProduct = [
  check("name")
    .isString()
    .withMessage("Fill in a product name of at least 3 characters."),
  check("price").isNumeric().withMessage("Price should be a number."),
  check("image").isString().optional({ checkFalsy: true }),
  check("brand").isString().withMessage("Brand name should be a string."),
  check("category").isString().withMessage("Category should be a string."),
  check("description")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Fill in a descroption of at least 6 characters."),
];

const validateUpdateProduct = [
  check("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Fill in a product name of at least 3 characters."),
  check("name"),
];

export {
  validateLogin,
  validateRegister,
  validateUpdateProfile,
  validateOrder,
  validateUpdateUser,
  validateNewProduct,
  validateUpdateProduct,
};

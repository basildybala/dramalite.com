const { check, validationResult } = require('express-validator')

exports.userValidtor = [
    check("name").trim().not().isEmpty().withMessage("Name is missing!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is missing!")
        .isLength({ min: 2, max: 20 })
        .withMessage("Password must be 8 to 20 characters long!"),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
        return res.json({ error: error[0].msg });
    }

    next();
};
exports.validatePassword = [
    check("newPassword")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is missing!")
        .isLength({ min: 3, max: 20 })
        .withMessage("Password must be 8 to 20 characters long!"),
];
exports.signInValidator = [
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

exports.actorInfoValidator = [
    check("name").trim().not().isEmpty().withMessage("Actor name is missing!"),
    check("about")
      .trim()
      .not()
      .isEmpty()
      .withMessage("About is a required field!"),
    check("gender")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Gender is a required field!"),
  ];
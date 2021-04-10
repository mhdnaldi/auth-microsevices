const { User } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

      // CHECK
      const checkEmail = await User.findOne({
        where: { email: req.body.email },
      });

      if (checkEmail) {
        return res.status(404).json({
          success: false,
          message: "EMAIL ALREADY EXISTS",
        });
      }
      if (!req.body.email.match(mailFormat)) {
        return res.status(404).json({
          success: false,
          message: "EMAIL NOT VALID",
        });
      }
      if (!req.body.password.match(passwordFormat)) {
        return res.status(404).json({
          success: false,
          message:
            "PASSWORD MUST INCLUDES ATLEAST 1 UPPERCASE, LOWERCASE, NUMBER, SYMBOL AND MINIMUM 8 CHARACTERS",
        });
      }
      if (!req.body.password.match(req.body.confirm_password)) {
        return res.status(404).json({
          success: false,
          message: "PASSWORD NOT MATCH",
        });
      }

      // ENCRYPT PASSWORD
      const hashPassword = await bcrypt.hash(req.body.password, 10);

      const data = { ...req.body, password: hashPassword };
      delete data.confirm_password;

      // POST
      await User.create(data);

      return res.status(200).json({
        success: true,
        message: "REGISTER SUCCESS",
        result: {
          email: data.email,
          fullname: data.fullname,
        },
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const checkEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (!checkEmail) {
        return res.status(404).json({
          success: false,
          message: "EMAIL NOT REGISTERED",
        });
      }

      // COMPARE ENCRYPT PASSWORD
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkEmail.password
      );
      if (!checkPassword) {
        return res.status(404).json({
          success: false,
          message: "WRONG PASSWORD",
        });
      }
      return res.status(200).json({
        success: true,
        message: "LOGIN SUCCESS",
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {},
};

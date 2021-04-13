const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const fs = require("fs");

const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
module.exports = {
  getProfile: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      const data = { ...user.dataValues, password: undefined };
      return res.json({
        success: true,
        message: "SUCCESS GET PROFILE",
        result: data,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      if (!req.body.email.match(mailFormat)) {
        return res.status(404).json({
          success: false,
          message: "EMAIL NOT VALID",
        });
      }
      ``;
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
      const data = { ...checkEmail.dataValues, password: undefined };
      return res.status(200).json({
        success: true,
        message: "LOGIN SUCCESS",
        result: data,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      let hashPassword;
      const id = req.params.id;
      const { fullname, address, phone, role, password } = req.body;
      const userId = await User.findByPk(id);
      if (!userId) {
        return res.status(404).json({
          success: false,
          message: "USER NOT FOUND",
        });
      }

      if (password) {
        if (!password.match(passwordFormat)) {
          return res.status(404).json({
            success: false,
            message:
              "PASSWORD MUST INCLUDES ATLEAST 1 UPPERCASE, LOWERCASE, NUMBER, SYMBOL AND MINIMUM 8 CHARACTERS",
          });
        }
        hashPassword = await bcrypt.hash(password, 10);
      }

      const updatedData = {
        fullname: fullname === "" ? userId.fullname : fullname,
        address: address === "" ? userId.address : address,
        phone: phone === "" ? userId.phone : phone,
        role: role === "" ? userId.role : role,
        password: password === "" ? userId.password : hashPassword,
        images: req.file === undefined ? userId.images : req.file.filename,
      };

      if (updatedData.images) {
        fs.unlink(`uploads/${userId.images}`, (err) => {
          !err ? console.log("ok") : console.log("false");
        });
      }

      await userId.update(updatedData);
      return res.status(200).json({
        success: true,
        message: "UPDATE SUCCESS",
        response: updatedData,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      if (user) {
        fs.unlink(`uploads/${user.images}`, (err) => {
          !err ? console.log("ok") : console.log("false");
        });
      }

      await User.destroy({ where: { id: id } });
      return res.status(200).json({
        success: true,
        message: "SUCCESS DELETE USER",
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
};

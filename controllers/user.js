const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const accountVerificationEmail = require("../middlewares/accountVerificationEmail");
const {
  userSignedUpResponse,
  userNotFoundResponse,
  invalidCredentialsResponse,
  userSignedOutResponse,
} = require("../config/responses");
const jwt = require("jsonwebtoken");

const controller = {
  register: async (req, res, next) => {
    let { name, lastName, photo, age, email, user, password } = req.body;
    let role = "user";
    let verified = false;
    let logged = false;
    let code = crypto.randomBytes(10).toString("hex");
    password = bcryptjs.hashSync(password, 10);

    try {
      await User.create({
        name,
        lastName,
        photo,
        age,
        email,
        user,
        password,
        role,
        verified,
        logged,
        code,
      });

      return userSignedUpResponse(req, res);
    } catch (error) {
      next(error);
    }
  },


  entry: async (req, res, next) => {
    const { password } = req.body;
    const { user } = req;
    try {
      const checkPassword = bcryptjs.compareSync(password, user.password);
      if (checkPassword) {
        const userDB = await User.findOneAndUpdate(
          { _id: user.id },
          { logged: true },
          { new: true }
        );
        const token = jwt.sign(
          {
            id: userDB._id,
            name: userDB.name,
            lastName: user.lastName,
            photo: userDB.photo,
            age: user.age,
            logged: userDB.logged,
          },
          process.env.KEY_JWT,
          { expiresIn: 60 * 60 * 24 * 365 }
        );
        let userToken = {
          email: user.email,
          role: user.role,
          name: user.name,
          age: user.age,
          lastName: user.lastName,
          logged: user.logged,
          photo: user.photo,
          id: user._id,
        };

        return res.status(200).json({
          response: { token, userToken },
          success: true,
          message: "Welcome " + user.name + " !",
        });
      }
      return invalidCredentialsResponse(req, res);
    } catch (error) {
      next(error);
    }
  },

  loginWithToken: async (req, res, next) => {
    let { user } = req;
    try {
      console.log(user)
      return res.json({
        response: {
          user: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            photo: user.photo,
            age: user.age,
            email: user.email,
            role: user.role,
            logged: user.logged,
          },
       
        }, 
        
        succes: true,
        message: "Welcome " + user.name + " !",
        
      });
        } catch (error) {
      next(error);
    }
  },
  unlogin: async (req, res, next) => {
    try {
      const { id } = req.user;
      await User.findOneAndUpdate({ _id: id }, { logged: false });
      return userSignedOutResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  readUserData: async (req, res, next) => {
    let { id } = req.params;
    try {
      let userid = await User.findById(id);
      if (userid) {
        res.status(200).json({
          response: userid,
          success: true,
          message: "user data founded",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  updateUserData: async (req, res, next) => {
    let { id } = req.params;
    try {
      let user = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      user
        ? res.status(200).json({
            response: user,
            success: true,
            message: "Your profile was update succesfully.",
          })
        : res.status(404).json({
            success: false,
            message: "Profile not found.",
          });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = controller;
const userModel = require("../models/user.model.js");
const jwtHelper = require("../../utility/jwt");
const mailHelper = require("../../utility/mailer");
const bcrypt = require("bcrypt");

class userService {
  /**
   * @description Service layer function for user login
   * @param {Object} body
   * @param {callback} callback
   */

  loginUser = (body, callback) => {
    userModel.loginUser(body, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        if (bcrypt.compareSync(body.password, data.password)) {
          var token = jwtHelper.generateToken(data._id);
          var result = {"data":data,"Token":token} ;
          return callback(null, result);
        } else {
          return callback("password mismatch");
        }
      }
    });
  };
  /**
   * @description Service layer function for user registeration
   * @param {Object} body
   * @param {callback} callback
   */
  registerUser = (body, callback) => {
    userModel.registerUser(body, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function for finding all user
   * @param {callback} callback
   */
  findAllUser = (callback) => {
    userModel.findAllUser((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function for finding particular user using email
   * @param {string} email
   * @param {callback} callback
   */
  findOneUser = (email, callback) => {
    userModel.findOneUser(email, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   *@description Service layer function for updating user details
   * @param {Object} userID
   * @param {Object} body
   * @param {callback} callback
   */
  updateUserDetail = (userID, body, callback) => {
    userModel.updateUserDetail(userID, body, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   *@description Service layer function for deleting a user
   * @param {Object} userID
   * @param {callback} callback
   */
  deleteUser = (userID, callback) => {
    userModel.deleteUser(userID, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   * @description Service layer function for user forgot password
   * @param {string} email 
   * @returns 
   */
  forgotPassword = (email) => {
    return userModel
      .forgotPassword(email)
      .then((data) => {
        let token = data.resetPasswordToken
        return mailHelper
          .mailer(data.email, token)
          .then((data) => {
            data.token = token
            return data;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };
  /**
   * @description Service layer function for user reset password
   * @param {string} token 
   * @param {string} password 
   * @returns 
   */
  resetPassword = (token,password) =>{
    return userModel.resetPassword(token,password)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw err;
    })
  }
}

module.exports = new userService();

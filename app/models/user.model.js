const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtHelper = require("../../utility/jwt");
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

const myUser = mongoose.model("User", userSchema);
let encryptedPassword;
class userModel {
  /**
   * @description model function for user login
   * @param {Object} body
   * @param {callback} callback
   * @returns err or data
   */
  loginUser = (body, callback) => {
    return myUser.findOne({ email: body.email }, (err, data) => {
      return err
        ? callback(err, null)
        : data == null
        ? callback("Email id is not present", null)
        : callback(null, data);
    });
  };

  /**
   * @description model function for user registeration
   * @param {Object} body
   * @param {callback} callback
   * @returns err or data
   */
  registerUser = (body, callback) => {
    encryptedPassword = bcrypt.hashSync(body.password, 10);
    const user = new myUser({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: encryptedPassword,
    });

    return user.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   *@description model function for finding all user in database
   * @param {callback} callback
   * @returns err or data
   */
  findAllUser = (callback) => {
    return myUser.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description model function for finding user based on email in database
   * @param {string} email
   * @param {callback} callback
   * @returns err or data
   */
  findOneUser = (email, callback) => {
    myUser.findOne({ email: email }, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description model function for user detail updation
   * @param {string} userID
   * @param {Object} body
   * @param {callback} callback
   * @returns err or data
   */
  updateUserDetail = (userID, body, callback) => {
    // Find user and update it with the request body
    myUser.findByIdAndUpdate(
      userID,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };
  /**
   *@description model function for user deletion
   * @param {string} userID
   * @param {callback} callback
   * @returns err or data
   */
  deleteUser = (userID, callback) => {
    myUser.findByIdAndRemove(userID, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
  /**
   *@description model function for forgot user password
   * @param {string} email
   * @returns err or data
   */
  forgotPassword = (email) => {
    return myUser
      .findOne({ email: email })
      .then((data) => {
        if (!data) {
          throw "Email not found";
        } else {
          let randomToken = jwtHelper.generateRandomCode();
          data.resetPasswordToken = randomToken;
          data.resetPasswordExpires = Date.now() + 3600000;
          return data
            .save()
            .then((res) => {
              return res;
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  /**
   *@description model function for user password reset
   * @param {string} token
   * @param {string} newPassword
   * @returns err or data
   */
  resetPassword = (token, newPassword) => {
    return myUser
      .findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      })
      .then((data) => {
        if (!data) {
          throw "token not found";
        } else {
          encryptedPassword = bcrypt.hashSync(newPassword, 10);
          (data.password = encryptedPassword),
            (data.resetPasswordToken = undefined),
            (data.resetPasswordExpires = undefined);
          return data
            .save()
            .then((data) => {
              return data;
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}

module.exports = new userModel();

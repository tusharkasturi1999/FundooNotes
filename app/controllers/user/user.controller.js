const userService = require("../../service/user.service");
const logger = require("../../../config/logger");
const { validationResult } = require("express-validator");
const dtoObject = require("./user.responseSchema");
let responseObject;

class userController {
  /**
   * @description Handles request and response for user login
   * @param {Object} req
   * @param {Object} res
   */

  loginUser = (req, res) => {
    let body = req.body;
    userService.loginUser(body, (err, data) => {
      if (err) {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err;
        return res.send(responseObject);
      }
      logger.info("login Successful");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles request and response for user registeration
   * @param {Object} req
   * @param {Object} res
   */

  registerUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseObject = dtoObject.userApiFailure;
      responseObject.message = errors.array();
      return res.send(responseObject);
    }
    let body = req.body;
    userService.registerUser(body, (err, data) => {
      if (err) {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      logger.info("Registeration Successful");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles request and response for finding all user
   * @param {Object} req
   * @param {Object} res
   */
  findAllUser = (req, res) => {
    userService.findAllUser((err, data) => {
      if (err) {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      logger.info("Retrieval successfull");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles request and response for finding one user
   * @param {Object} req
   * @param {Object} res
   */
  findOneUser = (req, res) => {
    let email = req.params.userID;
    userService.findOneUser(email, (err, data) => {
      if (err) {
        logger.error(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
         return res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        return res.send(responseObject);
      }
      logger.info("Retrieval Successful");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles request and response for updating a user
   * @param {Object} req
   * @param {Object} res
   */
  updateUserDetail = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let id = req.params.userID;
    let body = req.body;
    userService.updateUserDetail(id, body, (err, data) => {
      if (err) {
        logger.error(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        return res.send(responseObject);
      }
      logger.info("Updated succesfully");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = "Updated Successfully";
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles request and response for deleting a user
   * @param {Object} req
   * @param {Object} res
   */
  deleteUser = (req, res) => {
    let id = req.params.userID;
    userService.deleteUser(id, (err, data) => {
      if (err) {
        logger.error(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        return res.send(responseObject);
      }
      logger.info("delete succesfully");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = "deleted successfully";
      return res.send(responseObject);
    });
  };
  /**
   * @description Handles request and response for forgot password
   * @param {Object} req 
   * @param {Object} res 
   */
  forgotPassword = (req, res) => {
    let email = req.body.email;
    userService
      .forgotPassword(email)
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.send(err);
      });
  };
  /**
   * @description Handles request and response for resetting the password
   * @param {Object} req 
   * @param {Object} res 
   */
  resetPassword = (req, res) => {
    let token = req.params.token;
    let password = req.body.password
    userService
      .resetPassword(token,password)
      .then((data) => {
        responseObject = dtoObject.userValidationSuccess;
        responseObject.message = "Password updated successfully";
        return res.send(responseObject);
      })
      .catch((err) => {
        responseObject = dtoObject.userValidationFailure;
        responseObject.message = "token not found";
        return res.send(responseObject);
      });
  };
}

module.exports = new userController();

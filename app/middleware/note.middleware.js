const jwtHelper = require("../../utility/jwt");

class noteValidation {
  validate = (req, res, next) => {
    //check if content is present
    if (!req.body.content) {
      return res.status(400).send({
        message: "Note content can not be empty",
      });
    }
    //validate title name
    var pattern = new RegExp("^[a-zA-Z][a-zA-Z0-9]{2,}");
    if (!pattern.test(req.body.title)) {
      return res.status(400).send({
        message:
          "Title name should begin with alphabets and can contain only alphanumeric values and should be minimum of length 3",
      });
    } else {
      next();
    }
  };
  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @param {next} next 
   */
  ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"] || req.headers.token;
    if (!bearerHeader) {
      res.send("Token is empty");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwtHelper.verifyToken(token, (err, data) => {
      if (err) {
        res.send(err);
      }
      req.body.userId = data._id;
      next();
    });
  };
}

module.exports = new noteValidation();

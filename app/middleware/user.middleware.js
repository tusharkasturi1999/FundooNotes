class userMiddleware {
  userValidation = (req, res, next) => {
    //first name validation
    let firstNameRegex = RegExp("^[A-Z][a-zA-Z]{2,}");
    if (!firstNameRegex.test(req.body.firstName)) {
      return res.status(400).send({
        message:
          "First Name should begin with caps and should be minimum of length 3",
      });
    }

    //last name validation
    let lastNameRegex = RegExp("^[A-Z][a-zA-Z]{2,}");
    if (!lastNameRegex.test(req.body.lastName)) {
      return res.status(400).send({
        message:
          "Last Name should begin with caps and should be minimum of length 3",
      });
    }

    //age validation
    if (req.body.age < 1 || req.body.age > 100) {
      return res.status(400).send({
        message: "Enter proper age",
      });
    }

    //email validation
    let emailRegex = RegExp(
      "^[a-zA-Z0-9-_+]+(\\.?[a-zA-Z0-9-_]+)@[a-zA-Z0-9-_]+\\.[a-zA-Z]{2,}(\\.?[a-zA-Z-_]+)$"
    );
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).send({
        message: "Enter a valid email ID",
      });
    }
    next();
  };
}

module.exports = new userMiddleware();

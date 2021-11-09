var nodemailer = require("nodemailer");
require('dotenv').config();
class nodeMailer {
  mailerForForgotPassword = (email, token) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.admiMail,
        pass: process.env.adminPass,
      },
    });

    var mailOptions = {
      from: process.env.admiMail,
      to: email,
      subject: "Sending Email using Node.js",
      html: `<a href = "http://localhost:3000/user/reset/${token}">Click Here to Reset Password</a>`,
      text: "password reset",
    };

    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return "Recovery Mail Sent Successfully";
      })
      .catch((err) => {
        return err;
      });
  };

  mailerForSuccessfullLogin = (email) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.admiMail,
        pass: process.env.adminPass,
      },
    });

    var mailOptions = {
      from: process.env.admiMail,
      to: email,
      subject: "Sending Email using Node.js",
      text: "Successfully Logged In",
    };

    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return "Email sent successfully!!";
      })
      .catch((err) => {
        return err;
      });
  };
}

module.exports = new nodeMailer();

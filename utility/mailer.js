var nodemailer = require("nodemailer");
require('dotenv').config();
class nodeMailer {
  mailer = (email, token) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kashtusk@gmail.com",
        pass: process.env.password,
      },
    });

    var mailOptions = {
      from: "kashtusk@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      html: `<a href='http://localhost:3000/reset/${token}'>click here</a>`,
      text: "password reset",
    };

    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };
}

module.exports = new nodeMailer();

const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: "00711483707054",
    pass: "2cea2674417397",
  },
});

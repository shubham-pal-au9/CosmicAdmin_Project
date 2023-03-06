const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Forget password

router.post("/forgetpassword", (req, res, next) => {
  db.query(
    `SELECT * FROM admin_panel WHERE email='${req.body.email}'`,
    function (err, getUser) {
      if (err) {
        console.log(err);
      } else {
        if (getUser && getUser.length > 0) {
          var otp = Math.floor(1000 + Math.random() * 9000);
          db.query(
            `UPDATE admin_panel SET otp ='${otp}' WHERE email='${req.body.email}'`,
            (err, updatePlayer) => {
              if (err) {
                console.log(err);
              }

              // send email
              var smtpConfig = {
                host: "smtp.mailgun.org",
                port: 465,
                secure: true, // use SSL
                /* auth: {
                  user: "support@cosmicassassin.com",
                  pass: "cca6a7fdba92c3678897ee53985fa664-cc9b2d04-9b6910b6",
                }, */
              };
              var transporter = nodemailer.createTransport(smtpConfig);

              var details = {
                from: "support@cosmicassassin.com", // sender address same as above
                to: `${req.body.email}`, // Receiver's email id
                subject: "Your OTP for reset your password ", // Subject of the mail.
                html:
                  "<h3>OTP for account verification is </h3>" +
                  "<h1 style='font-weight:bold;'>" +
                  otp +
                  "</h1>", // Sending OTP
              };

              transporter.sendMail(details, function (error, data) {
                if (error) console.log("Error:", error);
                else console.log("CheckData:", data);
              });

              var send_data =
                "OTP has been sent to your register email id please check!";
              res.json(send_data);
            }
          );
        } else {
          res.json("Email id does not exist");
        }
      }
    }
  );
});

// Verify password

router.post("/verifypassword", (req, res, next) => {
  db.query(
    `SELECT * FROM admin_panel WHERE email='${req.body.email}'`,
    async function (err, getUser) {
      if (err) {
        console.log(err);
      } else {
        if (getUser.length > 0) {
          var validPassword = await bcrypt.compare(
            req.body.password,
            getUser[0].password
          );
        }
        console.log("Password77:", req.body.password.length);
        if (
          getUser &&
          getUser.length > 0 &&
          validPassword === false &&
          req.body.confirm_password == req.body.password &&
          req.body.password.length > 5 &&
          req.body.confirm_password.length > 5
        ) {
          db.query(
            `SELECT * FROM admin_panel WHERE email='${req.body.email}' AND otp='${req.body.otp}'`,
            async (err, updateUser) => {
              if (err) {
                console.log(err);
              }

              const saltRounds = 10;
              const password = req.body.password;
              const encryptedPassword = await bcrypt.hash(password, saltRounds);

              if (updateUser.length > 0) {
                const userEmail = updateUser[0].email;
                db.query(
                  `UPDATE admin_panel SET password ='${encryptedPassword}' WHERE email='${userEmail}'`,
                  (err, updatePlayer) => {
                    if (err) {
                      console.log(err);
                    }
                    res.json("Password has been reset successfully");
                  }
                );
              } else {
                res.json("OTP is invalid please check!");
              }
            }
          );
        } else if (validPassword === true) {
          res.json("Password must be different from previous one!");
        } else if (getUser.length === 0) {
          res.json("Email id is invalid please check!");
        } else if (req.body.confirm_password != req.body.password) {
          res.json("Confirm password does not match");
        } else if (req.body.password.length < 6) {
          res.json("Password should be 6 character long");
        } else if (req.body.confirm_password.length < 6) {
          res.json("Confirm password should be 6 character long");
        } else {
          res.json("OTP is invalid please check!");
        }
      }
    }
  );
});

module.exports = router;

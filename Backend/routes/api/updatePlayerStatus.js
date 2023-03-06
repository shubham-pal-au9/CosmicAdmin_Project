const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Update Api for block and unblock of player

router.post("/playerisactive", (req, res, next) => {
  console.log("Incoming User:", req.headers.authorization);
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    console.log("Token:", theToken);
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    console.log("decoded:", decoded);
    db.query(
      "SELECT * FROM admin_panel where id=?",
      decoded.id,
      function (error, results, fields) {
        if (error) throw error;
        db.query(
          `UPDATE users SET is_active=${db.escape(
            req.body.isActive
          )} WHERE user_id=${db.escape(req.body.userId)};`,
          function (err, statusRes) {
            if (err) {
              console.log(err);
            } else {
              var send_data = statusRes;
              res.json(send_data);
            }
          }
        );
      }
    );
  } else {
    res.status(422).json({
      message: "Please provide the token",
    });
  }
});

module.exports = router;
